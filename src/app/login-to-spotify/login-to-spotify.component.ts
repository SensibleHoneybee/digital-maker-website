import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-login-to-spotify',
  templateUrl: './login-to-spotify.component.html',
  styleUrls: ['./login-to-spotify.component.css']
})
export class LoginToSpotifyComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private mainService: MainService) { }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      clientId: ['', Validators.required],
      clientSecret: ['', Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.mainService.setLoading(true);
    this.mainService.setSpotifyClientIdAndSecret(this.f.clientId.value, this.f.clientSecret.value);
    this.router.navigate(['/play-spotify']);
  }
}
