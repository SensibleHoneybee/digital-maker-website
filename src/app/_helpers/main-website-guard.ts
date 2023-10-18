import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { MainService } from '../_services/main.service';

@Injectable({ providedIn: 'root' })
export class MainWebsiteGuard implements CanActivate {
    constructor(
        private router: Router,
        private mainService: MainService
    ) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (route.paramMap.has('instanceid')) {
            this.mainService.setInstanceId(route.paramMap.get('instanceid'));
            return true;
        }

        this.mainService.setErrorMessage('No instance ID has been provided');
        this.router.navigate(['/error-page']);
        return false;
    }
}