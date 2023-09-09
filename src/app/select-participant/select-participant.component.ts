import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ParticipantIdAndName } from '../_models/participant';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-select-participant',
  templateUrl: './select-participant.component.html',
  styleUrls: ['./select-participant.component.css']
})
export class SelectParticipantComponent implements OnInit {
  selectedParticipant: ParticipantIdAndName;
  participantIdsAndNames: ParticipantIdAndName[];
  loading = false;
  currentParticipantIdsAndNamesSubscription: Subscription;
  currentLoadingSubscription: Subscription;

  constructor(private router: Router, private mainService: MainService) { }

  ngOnInit(): void {
    if (this.mainService.currentLoginCipherValue != null && this.mainService.currentLoginCipherValue != '') {
      if (confirm("You are already logged in... \r\nAre you sure to want to leave that login and log in afresh?")) {
        this.mainService.removeParticipantDetails();
      } else {
        this.router.navigate(['/']);
        return;
      }
    }

    this.mainService.getParticipantsForMeeting();

    this.currentLoadingSubscription = this.mainService.currentParticipantIdsAndNames.subscribe(b => {
      this.participantIdsAndNames = b;
      if (b) {
        this.mainService.setLoading(false);
      }
    });
    this.currentLoadingSubscription = this.mainService.currentLoading.subscribe(b => {
      this.loading = b;
    });
  }

  setCurrentParticipant(participant: ParticipantIdAndName): void {
    this.selectedParticipant = participant;
  }
}
