import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from '../_services/main.service';
import { Mode } from '../_models/mode';

@Component({
  selector: 'app-login-meeting-admin',
  templateUrl: './login-meeting-admin.component.html',
  styleUrls: ['./login-meeting-admin.component.css']
})
export class LoginMeetingAdminComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  currentMeetingAdminLoggedInSubscription: Subscription;
  currentLoadingSubscription: Subscription;
  
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private mainService: MainService) { }

  ngOnInit() {
    if (this.mainService.currentModeValue != Mode.MeetingAdmin && this.mainService.currentModeValue != Mode.NotSelected) {
      if (confirm("You have been working in the " + this.mainService.currentModeValue + "screen.\r\nAre you sure to want to leave that screen and work on the meeting admin screen?")) {
        this.mainService.leave();
      } else {
        this.router.navigate(['/']);
        return;
      }
    }

    this.mainService.setMode(Mode.MeetingAdmin);

    this.currentMeetingAdminLoggedInSubscription = this.mainService.currentMeetingAdminLoggedIn.subscribe(value => {
      if (value != null) {
        // Non-null current meeting admin means loading is done and we can navigate away from this screen, back to wherever we came from
        this.router.navigate([this.returnUrl]);
        return;
      }
    });
    this.currentLoadingSubscription = this.mainService.currentLoading.subscribe(b => {
      this.loading = b;
    });

    this.loginForm = this.formBuilder.group({
      meetingAdminPassword: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentMeetingAdminLoggedInSubscription.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.mainService.setLoading(true);
    this.mainService.loginMeetingAdmin(this.f.meetingAdminPassword.value);
  }
}