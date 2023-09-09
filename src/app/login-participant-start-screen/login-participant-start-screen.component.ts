import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-login-participant-start-screen',
  templateUrl: './login-participant-start-screen.component.html',
  styleUrls: ['./login-participant-start-screen.component.css']
})
export class LoginParticipantStartScreenComponent implements OnInit {
  loading = false;
  currentLoadingSubscription: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private mainService: MainService) { }

  ngOnInit(): void {
    if (this.mainService.currentLoginCipherValue != null && this.mainService.currentLoginCipherValue != '') {
      if (confirm("You are already logged in as a participant... \r\nAre you sure to want to leave that login and log in afresh?")) {
        this.mainService.leaveMeeting();
      } else {
        this.router.navigate(['/']);
        return;
      }
    }

    this.currentLoadingSubscription = this.mainService.currentLoading.subscribe(b => {
      this.loading = b;
    });
  }

  loginAsNew() {
    this.router.navigate(['/login-participant-new']);
  }

  loginAsExisting() {
    this.router.navigate(['/select-participant']);
  }

}
