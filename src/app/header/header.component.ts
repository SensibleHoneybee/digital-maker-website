import { Component, OnInit } from '@angular/core';
import { MainService } from '../_services/main.service';
import { Subscription } from 'rxjs';
import { Instance } from '../_models/instance';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  currentMeetingName: string;
  currentMeetingNameSubscription: Subscription;
  currentParticipantNames: string;
  currentParticipantNamesSubscription: Subscription;
  currentInstance: Instance;
  currentInstanceSubscription: Subscription;

  constructor(private mainService: MainService) { }

  ngOnInit() {
    this.currentMeetingNameSubscription = this.mainService.currentMeetingName.subscribe(meetingName => {
      this.currentMeetingName = meetingName;
    });
    this.currentParticipantNamesSubscription = this.mainService.currentParticipantNames.subscribe(participantNames => {
      this.currentParticipantNames = participantNames;
    });
    this.currentInstanceSubscription = this.mainService.currentInstance.subscribe(instance => {
      this.currentInstance = instance;
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentInstanceSubscription.unsubscribe();
  }

}
