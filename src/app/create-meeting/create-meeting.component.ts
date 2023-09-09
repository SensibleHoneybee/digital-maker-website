import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { Mode } from '../_models/mode';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-create-meeting',
  templateUrl: './create-meeting.component.html',
  styleUrls: ['./create-meeting.component.css']
})
export class CreateMeetingComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  meetingId: string;
  currentMode: Mode;
  currentMeetingAdminLoggedInSubscription: Subscription
  currentModeSubscription: Subscription;
  currentMeetingId: string;
  currentMeetingIdSubscription: Subscription;
  currentLoadingSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private mainService: MainService) {
  }

  ngOnInit(): void {
    if (this.mainService.currentModeValue != Mode.MeetingAdmin && this.mainService.currentModeValue != Mode.NotSelected) {
      if (confirm("You have been working in the " + this.mainService.currentModeValue + "screen.\r\nAre you sure to want to leave that screen and work on the meeting admin screen?")) {
        this.mainService.leaveMeeting();
      } else {
        this.router.navigate(['/']);
        return;
      }
    }

    if (this.mainService.currentMeetingAdminPasswordValue == null) {
        this.router.navigate(['/login-meeting-admin']);
        return;
    }

    this.mainService.leaveMeeting();

    this.loginForm = this.formBuilder.group({
      meetingName: ['', Validators.required],
      meetingPassword: ['', Validators.required],
      meetingPasswordConfirm: ['', Validators.required]
    });

    this.currentMeetingIdSubscription = this.mainService.currentMeetingId.subscribe(value => {
      if (value != null) {
        this.meetingId = value;
        this.router.navigate(['/meeting-admin/' + this.meetingId]);
        return;
      }
    });
    this.currentLoadingSubscription = this.mainService.currentLoading.subscribe(b => {
      this.loading = b;
    });
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    if (this.f.meetingPassword.value != this.f.meetingPasswordConfirm.value) {
      alert("Passwords do not match");
      return;
    }

    this.submitted = true;

    this.meetingId = uuidv4();
    this.mainService.setLoading(true);
    this.mainService.createMeeting(this.meetingId, this.f.meetingName.value, this.f.meetingPassword.value);
  }
}
