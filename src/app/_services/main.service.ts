import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Observer, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mode } from '../_models/mode';
import { Instance } from '../_models/instance';
import { WebsocketService } from './websocket.service';

const WEBSERVICE_URL = "wss://xxxxxxxx.execute-api.eu-west-2.amazonaws.com/Prod";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private modeSubject: BehaviorSubject<Mode>;
  public mode: Observable<Mode>;
  private currentInstanceSubject: BehaviorSubject<Instance>;
  public currentInstance: Observable<Instance>;
  
  public messages: Subject<any>;

  constructor(private wsService: WebsocketService) {
    var storedModeString = sessionStorage.getItem('digitalMakerWebsiteMode')
    var storedMode = Mode.NotSelected;
    if (storedModeString != null) {
      if (storedModeString == 'CustomerScanner') {
        storedMode = Mode.CustomerScanner;
      } else if (storedModeString == 'Checkout') {
        storedMode = Mode.Checkout;
      } else if (storedModeString == 'CodingWindow') {
        storedMode = Mode.CodingWindow;
      }
    }

    this.modeSubject = new BehaviorSubject<Mode>(storedMode);
    this.mode = this.modeSubject.asObservable();
    this.currentInstanceSubject = new BehaviorSubject<Instance>(null);
    this.currentInstance = this.currentInstanceSubject.asObservable();

    this.messages = <Subject<any>>wsService.connect(WEBSERVICE_URL).pipe(map(
      response => {
        return response.data;
      }
    ));
  }

  public get currentInstanceValue(): Instance { return this.currentInstanceSubject.value; }

  setInstance(instance: Instance) {
    sessionStorage.setItem('currentInstanceId', instance.instanceId);
    this.currentInstanceSubject.next(instance);
  }
}