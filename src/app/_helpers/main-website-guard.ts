import { Injectable, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mode } from '../_models/mode';
import { MainService } from '../_services/main.service';

@Injectable({ providedIn: 'root' })
export class MainWebsiteGuard implements CanActivate {
    currentMode: Mode;
    currentModeSubscription: Subscription;

    constructor(
        private router: Router,
        private mainService: MainService
    ) {

        this.currentMode = Mode.NotSelected;
        this.currentModeSubscription = mainService.currentMode.subscribe(mode => {
            this.currentMode = mode;
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.mainService.currentMeetingIdValue == null) {
            // No meeting. This is an error if we're checking which page to load
            this.router.navigate(['/error-page']);
            return false;
        }    

        if (this.mainService.currentLoginCipherValue == null) {
            // Logged into meeting, but not as a participant
            this.router.navigate(['/login-participant-start-screen']);
            return false;
        }

        switch (this.currentMode) {
            case Mode.WriteCode: { 
                this.router.navigate(['/write-code']);
                return false;
            }
            case Mode.CustomerScanner: {
                this.router.navigate(['/customer-scanner']);
                return false;
            } 
            case Mode.Checkout: { 
                this.router.navigate(['/checkout']);
                return false;
            }
            case Mode.MeetingAdmin: { 
                this.router.navigate(['/meeting-admin']);
                return false;
            }
         }

        // No specific mode set, or NotSelected is set. Navigate to the default screen, which is start-screen
        return true;
    }
}