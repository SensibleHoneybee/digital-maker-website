import { Component, OnInit } from '@angular/core';
import { MainService } from '../_services/main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.css']
})
export class ErrorPageComponent implements OnInit {
  currentErrorMessage: string;
  currentErrorMessageSubscription: Subscription;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.currentErrorMessageSubscription = this.mainService.currentErrorMessage.subscribe(errorMessage => {
      this.currentErrorMessage = errorMessage;
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentErrorMessageSubscription.unsubscribe();
  }
}