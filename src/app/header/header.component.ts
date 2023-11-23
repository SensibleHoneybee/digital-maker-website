import { Component, OnInit } from '@angular/core';
import { MainService } from '../_services/main.service';
import { interval, Subscription } from 'rxjs';
import { Instance } from '../_models/instance';
import { ConnectionTestNumberRequest } from '../_requests/ConnectionTestNumberRequest';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentInstance: Instance;
  currentInstanceSubscription: Subscription;
  currentPageTitle: string;
  currentPageTitleSubscription: Subscription;
  currentConnectionLost: boolean;
  currentConnectionLostSubscription: Subscription;

  timerSubscription: Subscription;
  currentReceivedConnectionTestNumber: Subscription;
  currentConnectionTestNumber = 0;
  sentConnectionTestNumber = '';
  receivedConnectionTestNumber = '';

  constructor(private mainService: MainService) { 
    const source = interval(10000);
    this.timerSubscription = source.subscribe(x => {
      // On a 5-second timer.
      // First check if the last connection request was responded to
      var connectionLost = this.sentConnectionTestNumber != null
        && this.sentConnectionTestNumber != ''
        && this.sentConnectionTestNumber != this.receivedConnectionTestNumber;
      this.mainService.setConnectionLost(connectionLost);

      // Now send a new connection request.
      this.currentConnectionTestNumber++;
      this.sentConnectionTestNumber = this.currentConnectionTestNumber.toString();
      let connectionTestNumberRequest: ConnectionTestNumberRequest = {
        connectionTestNumber: this.sentConnectionTestNumber
      };
      this.mainService.sendConnectionTestNumberRequest(connectionTestNumberRequest);
    });
    this.currentReceivedConnectionTestNumber = mainService.currentReceivedConnectionTestNumber.subscribe(x => {
      this.receivedConnectionTestNumber = x;
    });
  }

  ngOnInit() {
    this.currentInstanceSubscription = this.mainService.currentInstance.subscribe(instance => {
      this.currentInstance = instance;
    });
    this.currentPageTitleSubscription = this.mainService.currentPageTitle.subscribe(pageTitle => {
      this.currentPageTitle = pageTitle;
    });
    this.currentConnectionLostSubscription = this.mainService.currentConnectionLost.subscribe(connectionLost => {
      this.currentConnectionLost = connectionLost;
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentInstanceSubscription.unsubscribe();
    this.currentPageTitleSubscription.unsubscribe();
    this.currentConnectionLostSubscription.unsubscribe();
    this.timerSubscription.unsubscribe();
    this.currentReceivedConnectionTestNumber.unsubscribe();
  }
}
