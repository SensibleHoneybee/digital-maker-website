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
import { ConnectionTestNumberRequest } from '../_requests/ConnectionTestNumberRequest';
import { DeleteInputEventHandlerRequest } from '../_requests/DeleteInputEventHandlerRequest';
import { OutputActionResponse } from '../_responses/output-action-response';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

const WEBSERVICE_URL = "wss://ob1xmlgs72.execute-api.eu-west-2.amazonaws.com/Prod/";
const SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token";
const SPOTIFY_SEARCH_URL = "https://api.spotify.com/v1/search?type=track&limit=1&q=";
const SPOTIFY_PLAY_URL = "https://api.spotify.com/v1/me/player/play";

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
  private currentSpotifyClientIdSubject: BehaviorSubject<string>;
  public currentSpotifyClientId: Observable<string>;
  private currentSpotifyClientSecretSubject: BehaviorSubject<string>;
  public currentSpotifyClientSecret: Observable<string>;
  private currentSpotifyAccessTokenSubject: BehaviorSubject<string>;
  public currentSpotifyAccessToken: Observable<string>;
  private currentReceivedConnectionTestNumberSubject: BehaviorSubject<string>;
  public currentReceivedConnectionTestNumber: Observable<string>;
  private currentConnectionLostSubject: BehaviorSubject<boolean>;
  public currentConnectionLost: Observable<boolean>;  

  public messages: Subject<any>;

  constructor(private wsService: WebsocketService, private http: HttpClient) {
    var theStoredCurrentSpotifyClientId = sessionStorage.getItem('currentSpotifyClientId');
    var theStoredCurrentSpotifyClientSecret = sessionStorage.getItem('currentSpotifyClientSecret');

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
    this.currentConsoleOutputTextSubject = new BehaviorSubject<string>('');
    this.currentConsoleOutputText = this.currentConsoleOutputTextSubject.asObservable();
    this.currentPlaySoundSubject = new BehaviorSubject<string>('');
    this.currentPlaySound = this.currentPlaySoundSubject.asObservable();
    this.currentSpotifyClientIdSubject = new BehaviorSubject<string>(theStoredCurrentSpotifyClientId);
    this.currentSpotifyClientId = this.currentSpotifyClientIdSubject.asObservable();
    this.currentSpotifyClientSecretSubject = new BehaviorSubject<string>(theStoredCurrentSpotifyClientSecret);
    this.currentSpotifyClientSecret = this.currentSpotifyClientSecretSubject.asObservable();
    this.currentSpotifyAccessTokenSubject = new BehaviorSubject<string>('');
    this.currentSpotifyAccessToken = this.currentSpotifyAccessTokenSubject.asObservable();
    this.currentReceivedConnectionTestNumberSubject = new BehaviorSubject<string>('0');
    this.currentReceivedConnectionTestNumber = this.currentReceivedConnectionTestNumberSubject.asObservable();
    this.currentConnectionLostSubject = new BehaviorSubject<boolean>(false);
    this.currentConnectionLost = this.currentConnectionLostSubject.asObservable();

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
  public get currentSpotifyClientIdValue(): string { return this.currentSpotifyClientIdSubject.value; }
  public get currentSpotifyClientSecretValue(): string { return this.currentSpotifyClientSecretSubject.value; }
  public get currentSpotifyAccessTokenValue(): string { return this.currentSpotifyAccessTokenSubject.value; }
  public get currentReceivedConnectionTestNumberValue(): string { return this.currentReceivedConnectionTestNumberSubject.value; }
  public get currentConnectionLostValue(): boolean { return this.currentConnectionLostSubject.value; }

  leave() {
    // remove user from local storage to log user out
    this.currentInstanceIdSubject.next(null);
    this.currentInstanceSubject.next(null);
    this.currentPageTitleSubject.next('Digital Maker');
    this.currentConsoleOutputTextSubject.next('');
    this.currentPlaySoundSubject.next('');
    this.currentSpotifyClientIdSubject.next('');
    this.currentSpotifyClientSecretSubject.next('');
    this.currentSpotifyAccessTokenSubject.next('');
    this.currentReceivedConnectionTestNumberSubject.next('');
    this.currentConnectionLostSubject.next(false);
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

  setSpotifyClientIdAndSecret(id: string, secret: string) {
    this.currentSpotifyClientIdSubject.next(id);
    this.currentSpotifyClientSecretSubject.next(secret);

    sessionStorage.setItem('currentSpotifyClientId', id);
    sessionStorage.setItem('currentSpotifyClientSecret', secret);
  }

  setReceivedConnectionTestNumber(theNumber: string) {
    this.currentReceivedConnectionTestNumberSubject.next(theNumber);
  }

  setConnectionLost(b: boolean) {
    this.currentConnectionLostSubject.next(b);
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
      outputReceiverNames: [ 'text', 'move-spider', 'sound' ]
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
      case 'move-spider':
        this.sendInternalMessage('move-spider ' + outputActionResponse.data);
        break;
      case 'sound':
        this.playSound(outputActionResponse.data.toLowerCase());
        break;
    } 
  }

  sendConnectionTestNumberRequest(connectionTestNumberRequest: ConnectionTestNumberRequest) {
    let connectionTestNumberRequestJson = JSON.stringify(connectionTestNumberRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.ConnectionTestNumber, content: connectionTestNumberRequestJson };
    this.messages.next(requestWrapper);
  }

  getDefaultInputEventHandlers(): InputEventHandler[] {
    return [
      { nameOfEvent: 'Button pressed', pythonCode: '# Button pressed event\n' },
      { nameOfEvent: 'Text input', pythonCode: '# Text input event\n# The text that was input can be used in your code. It is a string variable called \'data\'\n' },
      { nameOfEvent: 'Game controller', pythonCode: '# Game controller event\n# The button that was pressed can be used in your code. It is a string variable called \'data\'\n# The value of \'data\' will be one of: \'left\', \'right\', \'up\', \'down\', \'red\', \'yellow\', \'green\' or \'blue\' \n' }
    ]
  }

  getSpotifyAccessToken(clientId: string, clientSecret: string) {
    var options = {
      headers: new HttpHeaders({
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret),
        'Content-Type': 'application/x-www-form-urlencoded',
      })
    };

    this.http.post<string>(SPOTIFY_TOKEN_URL, new HttpParams().set('grant_type', 'client_credentials'), options).subscribe(
        response => {
            if (Object.keys(response)[0] == 'access_token') {
              this.currentSpotifyAccessTokenSubject.next(Object.values(response)[0]);
            } else {
              alert('Non ' + Object.keys(response)[0]);
            }
        }
    );
  }

  searchSpotify(searchTerm: string): Observable<string[]> {
    alert('Access token: ' + this.currentSpotifyAccessTokenValue);
    var options = {
      headers: new HttpHeaders({
        'Authorization': 'Bearer ' + this.currentSpotifyAccessTokenValue
      })
    };
    return this.http.get<string[]>(SPOTIFY_SEARCH_URL + encodeURIComponent(searchTerm), options);
  }
}