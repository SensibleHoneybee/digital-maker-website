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
  currentInstance: Instance;
  currentInstanceSubscription: Subscription;

  constructor(private mainService: MainService) { 
    this.currentInstanceSubscription = this.mainService.currentInstance.subscribe(instance => {
      this.currentInstance = instance;
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentInstanceSubscription.unsubscribe();
  }

}
