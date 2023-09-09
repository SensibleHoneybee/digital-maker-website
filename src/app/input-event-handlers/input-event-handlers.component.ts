import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { InputEventHandler } from '../_models/input-event-handler';
import { Instance } from '../_models/instance';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-input-event-handlers',
  templateUrl: './input-event-handlers.component.html',
  styleUrls: ['./input-event-handlers.component.css']
})
export class InputEventHandlersComponent implements OnInit {
  currentInstance: Instance;
  currentInstanceSubscription: Subscription;
  currentInputEventHandler: InputEventHandler;
  currentInputEventHandlerSubscription: Subscription;

  constructor(private mainService: MainService) { 
    this.currentInstanceSubscription = this.mainService.currentInstance.subscribe((x: Instance) => {
      this.currentInstance = x;
    });
    this.currentInputEventHandlerSubscription = this.mainService.currentInputEventHandler.subscribe((x: InputEventHandler) => {
      this.currentInputEventHandler = x;
    });
  }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentInstanceSubscription.unsubscribe();
    this.currentInputEventHandlerSubscription.unsubscribe();
  }

}
