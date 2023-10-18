import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from '../_services/main.service';
import { DigitalMakerResponseType } from '../digital-maker-response-type';

@Component({
  selector: 'app-create-new-instance',
  templateUrl: './create-new-instance.component.html',
  styleUrls: ['./create-new-instance.component.css']
})
export class CreateNewInstanceComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  currentInstanceIdSubscription: Subscription;
  currentInstanceSubscription: Subscription;
  currentLoadingSubscription: Subscription;
  currentInternalMessageSubscription: Subscription;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private mainService: MainService) { }

  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      participantNames: ['', Validators.required]
    });

    this.currentInstanceIdSubscription = this.mainService.currentInstanceId.subscribe(value => {
      if (value == null) {
        alert('No instance is currently set. Please enter an instance or consult your Scout leader.');
        this.router.navigate(['/']);
      }
    });
    this.currentInstanceSubscription = this.mainService.currentInstance.subscribe(value => {
      if (value != null) {
        // If a current instance is loaded, we shuldn't be on this page. Navigate to write code
        this.router.navigate(['/write-code', this.mainService.currentInstanceIdValue]);
      }
    });
    this.currentLoadingSubscription = this.mainService.currentLoading.subscribe(b => {
      this.loading = b;
    });
    this.currentInternalMessageSubscription = this.mainService.currentInternalMessage.subscribe(msg => {
      // Listen for instance created messages
      if (msg == DigitalMakerResponseType.InstanceCreated) {
        this.mainService.setLoading(false);
        this.router.navigate(['/write-code', this.mainService.currentInstanceIdValue]);
      } else if (msg == DigitalMakerResponseType.InstanceDoesNotExist) {
        // If we receive this message, the attempt to load the instance failed and that means it's time to fulfil our duty and prompt for creation
        this.mainService.setLoading(false);
      }
    });

    // Now we'll check if we're already in a created instance. If so, it doens't make sense to create.
    this.mainService.setLoading(true);
    this.mainService.connectToInstance();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentInstanceIdSubscription.unsubscribe();
    this.currentInstanceSubscription.unsubscribe();
    this.currentLoadingSubscription.unsubscribe();
    this.currentInternalMessageSubscription.unsubscribe();
  }
  
  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
        return;
    }

    this.mainService.setLoading(true);
    this.mainService.createInstance(this.f.participantNames.value);
  }
}
