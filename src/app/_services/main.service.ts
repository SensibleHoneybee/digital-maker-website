import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Observer, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Instance } from '../_models/instance';
import { WebsocketService } from './websocket.service';
import { RequestWrapper } from '../request-wrapper';
import { RequestType } from '../request-type';
import { InputEventHandler } from '../_models/input-event-handler';
import { AddNewInputEventHandlerRequest } from '../_requests/AddNewInputEventHandlerRequest';
import { UpdateCodeRequest } from '../_requests/UpdateCodeRequest';
import { StartOrStopRunningRequest } from '../_requests/StartOrStopRunningRequest';
import { CreateInstanceRequest } from '../_requests/CreateInstanceRequest';
import { InputReceivedRequest } from '../_requests/InputReceivedRequest';
import { DeleteInputEventHandlerRequest } from '../_requests/DeleteInputEventHandlerRequest';
import { OutputActionResponse } from '../_responses/output-action-response';

const WEBSERVICE_URL = "wss://ob1xmlgs72.execute-api.eu-west-2.amazonaws.com/Prod/";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private currentInstanceIdSubject: BehaviorSubject<string>;
  public currentInstanceId: Observable<string>;
  private currentInstanceSubject: BehaviorSubject<Instance>;
  public currentInstance: Observable<Instance>;
  private currentInputEventHandlerSubject: BehaviorSubject<InputEventHandler>;
  public currentInputEventHandler: Observable<InputEventHandler>;
  private currentLoadingSubject: BehaviorSubject<boolean>;
  public currentLoading: Observable<boolean>;
  private currentErrorMessageSubject: BehaviorSubject<string>;
  public currentErrorMessage: Observable<string>;
  private currentInternalMessageSubject: BehaviorSubject<string>;
  public currentInternalMessage: Observable<string>;
  private newUserMessageSubject: BehaviorSubject<string>;
  public newUserMessage: Observable<string>;
  private currentPageTitleSubject: BehaviorSubject<string>;
  public currentPageTitle: Observable<string>;
  private currentConsoleOutputTextSubject: BehaviorSubject<string>;
  public currentConsoleOutputText: Observable<string>;
  private currentPlaySoundSubject: BehaviorSubject<string>;
  public currentPlaySound: Observable<string>;
  
  public messages: Subject<any>;

  constructor(private wsService: WebsocketService) {
    this.currentInstanceIdSubject = new BehaviorSubject<string>(null);
    this.currentInstanceId = this.currentInstanceIdSubject.asObservable();
    this.currentInstanceSubject = new BehaviorSubject<Instance>(null);
    this.currentInstance = this.currentInstanceSubject.asObservable();
    this.currentInputEventHandlerSubject = new BehaviorSubject<InputEventHandler>(null);
    this.currentInputEventHandler = this.currentInputEventHandlerSubject.asObservable();
    this.currentLoadingSubject = new BehaviorSubject<boolean>(null);
    this.currentLoading = this.currentLoadingSubject.asObservable();
    this.currentInternalMessageSubject = new BehaviorSubject<string>(null);
    this.currentInternalMessage = this.currentInternalMessageSubject.asObservable();
    this.currentErrorMessageSubject = new BehaviorSubject<string>(null);
    this.currentErrorMessage = this.currentErrorMessageSubject.asObservable();
    this.newUserMessageSubject = new BehaviorSubject<string>(null);
    this.newUserMessage = this.newUserMessageSubject.asObservable();
    this.currentPageTitleSubject = new BehaviorSubject<string>('Digital Maker');
    this.currentPageTitle = this.currentPageTitleSubject.asObservable();
    this.currentConsoleOutputTextSubject = new BehaviorSubject<string>('Digital Maker');
    this.currentConsoleOutputText = this.currentConsoleOutputTextSubject.asObservable();
    this.currentPlaySoundSubject = new BehaviorSubject<string>('');
    this.currentPlaySound = this.currentPlaySoundSubject.asObservable();

    this.messages = <Subject<any>>wsService.connect(WEBSERVICE_URL).pipe(map(
      response => {
        return response.data;
      }
    ));
  }

  public get currentInstanceIdValue(): string { return this.currentInstanceIdSubject.value; }
  public get currentInstanceValue(): Instance { return this.currentInstanceSubject.value; }
  public get currentInputEventHandlerValue(): InputEventHandler { return this.currentInputEventHandlerSubject.value; }
  public get currentLoadingValue(): boolean { return this.currentLoadingSubject.value; }
  public get currentInternalMessageValue(): string { return this.currentInternalMessageSubject.value; }
  public get currentErrorMessageValue(): string { return this.currentErrorMessageSubject.value; }
  public get newUserMessageValue(): string { return this.newUserMessageSubject.value; }
  public get currentPageTitleValue(): string { return this.currentPageTitleSubject.value; }
  public get currentConsoleOutputTextValue(): string { return this.currentConsoleOutputTextSubject.value; }
  public get currentPlaySoundValue(): string { return this.currentPlaySoundSubject.value; }

  leave() {
    // remove user from local storage to log user out
    this.currentInstanceIdSubject.next(null);
    this.currentInstanceSubject.next(null);
    this.currentPageTitleSubject.next('Digital Maker');
    this.currentConsoleOutputTextSubject.next('');
    this.currentPlaySoundSubject.next('');
    this.currentInputEventHandlerSubject.next(null);
    this.newUserMessageSubject.next('');
    this.currentLoadingSubject.next(false);
    this.currentInternalMessageSubject.next(null);
    this.currentErrorMessageSubject.next('');
  }

  setInstanceId(instanceId: string) {
    this.currentInstanceIdSubject.next(instanceId);
  }

  setInstance(instance: Instance) {
    this.currentInstanceSubject.next(instance);
    this.currentPageTitleSubject.next('Digital Maker - ' + instance?.participantNames);
  }

  removeInstance() {
    this.currentInstanceSubject.next(null);
    this.currentPageTitleSubject.next('Digital Maker');
  }

  setConsoleOutputText(consoleOutputText: string) {
    this.currentConsoleOutputTextSubject.next(consoleOutputText);
  }

  playSound(soundName: string) {
    this.currentPlaySoundSubject.next(soundName);
  }

  setInputEventHandler(inputEventHandler: InputEventHandler) {
    this.currentInputEventHandlerSubject.next(inputEventHandler);
  }

  setLoading(b: boolean) {
    this.currentLoadingSubject.next(b);
  }

  sendInternalMessage(msg: string) {
    this.currentInternalMessageSubject.next(msg);
  }

  setErrorMessage(b: string) {
    this.currentErrorMessageSubject.next(b);
  }

  addNewUserMessage(message: string) {
    this.newUserMessageSubject.next(message);
  }

  createInstance(participantNames: string) {
    // Remove current stored data, this will be reassigned if and when the request returns
    this.removeInstance();

    let createInstanceRequest: CreateInstanceRequest = {
      instanceId: this.currentInstanceIdValue,
      participantNames: participantNames
    };
    let createInstanceRequestJson = JSON.stringify(createInstanceRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.CreateInstance, content: createInstanceRequestJson };
    this.messages.next(requestWrapper);
  }

  connectToInstance() {
    // Remove current stored data, this will be reassigned if and when the request returns
    this.removeInstance();

    let connectToInstanceRequest = {
      instanceId: this.currentInstanceIdValue
    };
    let connectToInstanceRequestJson = JSON.stringify(connectToInstanceRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.ConnectToInstance, content: connectToInstanceRequestJson };
    this.messages.next(requestWrapper);
  }

  addNewInputEventHandler(inputEventHandler: InputEventHandler) {
    let request: AddNewInputEventHandlerRequest = {
      instanceId: this.currentInstanceIdValue,
      inputEventHandlerName: inputEventHandler.nameOfEvent,
      pythonCode: inputEventHandler.pythonCode
    };
    let requestJson = JSON.stringify(request);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.AddNewInputEventHandler, content: requestJson };
    this.messages.next(requestWrapper);
  }

  deleteInputEventHandler(inputEventHandler: InputEventHandler) {
    let request: DeleteInputEventHandlerRequest = {
      instanceId: this.currentInstanceIdValue,
      inputEventHandlerName: inputEventHandler.nameOfEvent
    };
    let requestJson = JSON.stringify(request);

    var requestWrapper: RequestWrapper = { requestType: RequestType.DeleteInputEventHandler, content: requestJson };
    this.messages.next(requestWrapper);
  }

  updateCode(inputEventHandlerName: string, code: string) {
    let request: UpdateCodeRequest = {
      instanceId: this.currentInstanceIdValue,
      inputEventHandlerName: inputEventHandlerName,
      pythonCode: code
    };
    let requestJson = JSON.stringify(request);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.UpdateCode, content: requestJson };
    this.messages.next(requestWrapper);
  }

  runCode(run: boolean) {
    let request: StartOrStopRunningRequest = {
      instanceId: this.currentInstanceIdValue,
      run: run
    };
    let requestJson = JSON.stringify(request);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.StartOrStopRunning, content: requestJson };
    this.messages.next(requestWrapper);
  }

  connectInputOutputDevice() {
    // Remove current stored data, this will be reassigned if and when the request returns
    this.removeInstance();

    let connectInputOutputDeviceRequest = {
      instanceId: this.currentInstanceIdValue,
      outputReceiverNames: [ 'text', 'sound' ]
    };
    let connectInputOutputDeviceRequestJson = JSON.stringify(connectInputOutputDeviceRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.ConnectInputOutputDevice, content: connectInputOutputDeviceRequestJson };
    this.messages.next(requestWrapper);
  }

  inputReceived(inputReceivedRequest: InputReceivedRequest) {
    let inputReceivedRequestJson = JSON.stringify(inputReceivedRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.InputReceived, content: inputReceivedRequestJson };
    this.messages.next(requestWrapper);
    this.setLoading(true);
  }

  outputReceived(outputActionResponse: OutputActionResponse) {
    switch (outputActionResponse.outputName) {
      case 'text':
        this.setConsoleOutputText(outputActionResponse.data);
        break;
      case 'sound':
        this.playSound(outputActionResponse.data.toLowerCase());
        break;
    }
    
  }

  getDefaultInputEventHandlers(): InputEventHandler[] {
    return [
      { nameOfEvent: 'Button pressed', pythonCode: '# Button pressed event\n# The colour of the button is available in a string variable called \'data\'\n' },
      { nameOfEvent: 'Barcode scanned', pythonCode: '#\n' }
    ]
  }
}