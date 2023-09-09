import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-login-meeting',
  templateUrl: './login-meeting.component.html',
  styleUrls: ['./login-meeting.component.css']
})
export class LoginMeetingComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  currentMeetingNameSubscription: Subscription;
  currentLoadingSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private mainService: MainService) { }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    if (this.mainService.currentLoginCipherValue != null && this.mainService.currentLoginCipherValue != '') {
      if (confirm("You are already logged in... \r\nAre you sure to want to leave that login and log in afresh?")) {
        this.mainService.leaveMeeting();
      } else {
        this.router.navigate(['/']);
        return;
      }
    }

    this.loginForm = this.formBuilder.group({
      meetingPassword: ['', Validators.required]
    });

    var meetingId = this.route.snapshot.paramMap.get('id');

    if (meetingId == null || meetingId == '') {
      // No meeting specified. This is an error.
      this.router.navigate(['/']);
      return;
    }

    this.mainService.setMeetingId(meetingId);

    this.currentMeetingNameSubscription = this.mainService.currentMeetingName.subscribe(value => {
      if (value != null && value != '') {
        // A meeting has been loaded, our work here is done.
        this.router.navigate(['/']);
        return;
      }
    });
    this.currentLoadingSubscription = this.mainService.currentLoading.subscribe(b => {
      this.loading = b;
    });
  }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.mainService.setLoading(true);
    this.mainService.joinMeeting(this.f.meetingPassword.value);
  }
}