import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Subscription } from 'rxjs';
import { Mode } from '../mode';
import { MainServiceService } from '../_services/main-service.service';

@Injectable({ providedIn: 'root' })
export class MainWebsiteGuard implements CanActivate {
    mode: Mode;
    modeSubscription: Subscription;

    constructor(
        private router: Router,
        private mainService: MainServiceService
    ) {
        this.mode = Mode.NotSelected;
        this.modeSubscription = mainService.mode.subscribe(mode => {
            this.mode = mode;
        });
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        switch (this.mode) {
            case Mode.CustomerScanner: { 
                this.router.navigate(['/customer-scanner'], { queryParams: { returnUrl: state.url }});
                return false;
            } 
            case Mode.Checkout: { 
                this.router.navigate(['/checkout'], { queryParams: { returnUrl: state.url }});
                return false;
            }
            case Mode.CodingWindow: { 
                this.router.navigate(['/coding-window'], { queryParams: { returnUrl: state.url }});
                return false;
            }
         } 

        // No specific mode set, or NotSelected is set. Navigate to the default screen, which is start-screen
         return true;
    }
}