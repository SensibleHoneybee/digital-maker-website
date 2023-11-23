import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MainService } from '../_services/main.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-play-spotify',
  templateUrl: './play-spotify.component.html',
  styleUrls: ['./play-spotify.component.css']
})
export class PlaySpotifyComponent implements OnInit {
  currentSpotifyAccessTokenSubscription: Subscription;
  clientId = '';
  clientSecret = '';
  
  constructor(private mainService: MainService, private router: Router) {
    this.currentSpotifyAccessTokenSubscription = this.mainService.currentSpotifyAccessToken.subscribe(
      x => { if (x != null && x != '') {
        this.mainService.searchSpotify('New Rules').subscribe(y => window.open('spotify:track:2ekn2ttSfGqwhhate0LSR0:play') /* navigator.clipboard.writeText('Spotify Search: ' + JSON.stringify(y)) */ )
      };
    });
  }

  ngOnInit(): void {
    this.clientId = this.mainService.currentSpotifyClientIdValue;
    this.clientSecret = this.mainService.currentSpotifyClientSecretValue;

    if (this.clientId == null || this.clientId == '') {
      // No client ID means we need to enter one
      this.router.navigate(['/login-to-spotify']);
    }
    if (this.clientSecret == null || this.clientSecret == '') {
      // No client ID means we need to enter one
      this.router.navigate(['/login-to-spotify']);
    }

    this.mainService.getSpotifyAccessToken(this.clientId, this.clientSecret);
  }
}
