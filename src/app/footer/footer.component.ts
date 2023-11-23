import { Component, OnInit } from '@angular/core';
import { Instance } from '../_models/instance';
import { Subscription } from 'rxjs';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentInstance: Instance;
  currentInstanceSubscription: Subscription;

  constructor(private mainService: MainService) { }

  ngOnInit(): void {
    this.currentInstanceSubscription = this.mainService.currentInstance.subscribe(instance => {
      this.currentInstance = instance;
    });
  }

   ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.currentInstanceSubscription.unsubscribe();
    }
  }