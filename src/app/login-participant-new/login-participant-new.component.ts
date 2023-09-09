import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-login-participant-new',
  templateUrl: './login-participant-new.component.html',
  styleUrls: ['./login-participant-new.component.css']
})
export class LoginParticipantNewComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  meetingId: string;
  currentMeetingIdSubscription: Subscription;
  currentLoginCipherSubscription: Subscription;
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
        this.mainService.removeParticipantDetails();
      } else {
        this.router.navigate(['/']);
        return;
      }
    }

    this.loginForm = this.formBuilder.group({
      meetingParticipants: ['', Validators.required],
      participantsPassword: ['', Validators.required],
      participantsPassword2: ['', Validators.required]
    });

    this.currentMeetingIdSubscription = this.mainService.currentMeetingId.subscribe(value => {
      if (value == null) {
        alert('No meeting is currently set. Please enter a meeting.');
        this.router.navigate(['/']);
      }
      this.meetingId = value;
    });
    this.currentLoginCipherSubscription = this.mainService.currentLoginCipher.subscribe(value => {
      if (value != null && value != '') {
        // A participant login-cipher has been loaded, our work here is done.
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

    // and check passwords match
    if (this.f.participantsPassword.value != this.f.participantsPassword2.value) {
      alert("The two passwords you entered do not match. Please try again.");
      return;
    }

    var participantId = uuidv4();
    var loginCipher = this.makeLoginCipher();

    this.mainService.setLoading(true);
    this.mainService.joinNewParticipant(participantId,
      this.f.meetingParticipants.value,
      this.f.participantsPassword.value,
      loginCipher);
  }

  makeLoginCipher(): string {
    var lengthOfCode = 40;
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890*$!";
    var text = "";
    for (var i = 0; i < lengthOfCode; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    
    return text;
  }
}
