import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mode } from '../_models/mode';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-meeting-admin',
  templateUrl: './meeting-admin.component.html',
  styleUrls: ['./meeting-admin.component.css']
})
export class MeetingAdminComponent implements OnInit {
  meetingId: string;
  currentMode: Mode;
  currentMeetingAdminLoggedInSubscription: Subscription
  currentModeSubscription: Subscription;
  currentMeetingId: string;
  currentMeetingIdSubscription: Subscription;
  currentMeetingName: string;
  currentMeetingNameSubscription: Subscription;
  currentMessages: string[];
  currentMessagesSubscription: Subscription;

  constructor(private route: ActivatedRoute,
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

    const id = this.route.snapshot.paramMap.get('id');

    if (id == null) {
      this.router.navigate(['/create-meeting']);
      return;
    }

    if (this.mainService.currentMeetingIdValue != null && this.mainService.currentMeetingIdValue != id) {
      if (confirm("You have been working on meeting " + this.mainService.currentMeetingNameValue + ".\r\nAre you sure to want to leave that screen and work on the meeting with ID " + id + "?")) {
        this.mainService.leaveMeeting();
      } else {
        this.router.navigate(['/']);
        return;
      }
    }

    this.mainService.setMode(Mode.MeetingAdmin);
  
    this.mainService.joinMeetingAsAdmin(id);

    // Set up subscriptions
    this.currentModeSubscription = this.mainService.currentMode.subscribe(x => {
      this.currentMode = x;
    });
    this.currentMeetingAdminLoggedInSubscription = this.mainService.currentMeetingAdminLoggedIn.subscribe(meetingAdminLoggedIn => {
      if (meetingAdminLoggedIn == null) {
        this.router.navigate(['/login-meeting-admin']);
        return;
      }
    });
    this.currentMeetingIdSubscription = this.mainService.currentMeetingId.subscribe(meetingId => {
      if (meetingId != null && meetingId != this.currentMeetingId) {
        // There is a specific meeting set. Navigate to it.
        this.router.navigate(['/meeting-admin/' + meetingId]);
      }
    });
    this.currentMeetingNameSubscription = this.mainService.currentMeetingName.subscribe(meetingName => {
      this.currentMeetingName = meetingName;
    });
    this.currentMessagesSubscription = this.mainService.currentMessages.subscribe(messages => {
      if (messages == null) {
        this.currentMessages = [];
        return;
      }
      
      messages.reverse();
      this.currentMessages = messages;
    });
  }

}
