import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Observer, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Mode } from '../_models/mode';
import { Instance } from '../_models/instance';
import { WebsocketService } from './websocket.service';
import { RequestWrapper } from '../request-wrapper';
import { RequestType } from '../request-type';
import { InputEventHandler } from '../_models/input-event-handler';
import { ShoppingSession } from '../_models/shopping-session';
import { AddNewInputEventHandlerRequest } from '../_requests/AddNewInputEventHandlerRequest';
import { JoinMeetingRequest } from '../_requests/JoinMeetingRequest';
import { JoinNewParticipantRequest } from '../_requests/JoinNewParticipantRequest';
import { StartCheckoutRequest } from '../_requests/StartCheckoutRequest';
import { CreateMeetingRequest } from '../_requests/CreateMeetingRequest';
import { JoinMeetingAsAdminRequest } from '../_requests/JoinMeetingAsAdminRequest';
import { LoginMeetingAdminRequest } from '../_requests/LoginMeetingAdminRequest';
import { RejoinMeetingAndParticipantWithLoginCipherRequest } from '../_requests/RejoinMeetingAndParticipantWithLoginCipherRequest';
import { RejoinParticipantWithPasswordRequest } from '../_requests/RejoinParticipantWithPasswordRequest';
import { AddNewVariableRequest } from '../_requests/AddNewVariableRequest';
import { GetOrCreateInstanceRequest } from '../_requests/GetOrCreateInstanceRequest';
import { ParticipantIdAndName } from '../_models/participant';

const WEBSERVICE_URL = "wss://ob1xmlgs72.execute-api.eu-west-2.amazonaws.com/Prod/";

@Injectable({
  providedIn: 'root'
})
export class MainService {
  private currentModeSubject: BehaviorSubject<Mode>;
  public currentMode: Observable<Mode>;
  private currentMeetingAdminLoggedInSubject: BehaviorSubject<string>;
  public currentMeetingAdminLoggedIn: Observable<string>;
  private currentMeetingAdminPasswordSubject: BehaviorSubject<string>;
  public currentMeetingAdminPassword: Observable<string>;
  private currentMeetingIdSubject: BehaviorSubject<string>;
  public currentMeetingId: Observable<string>;
  private currentMeetingPasswordSubject: BehaviorSubject<string>;
  public currentMeetingPassword: Observable<string>;
  private currentMeetingNameSubject: BehaviorSubject<string>;
  public currentMeetingName: Observable<string>;
  private currentParticipantIdsAndNamesSubject: BehaviorSubject<ParticipantIdAndName[]>;
  public currentParticipantIdsAndNames: Observable<ParticipantIdAndName[]>;
  private currentParticipantIdSubject: BehaviorSubject<string>;
  public currentParticipantId: Observable<string>;
  private currentParticipantNamesSubject: BehaviorSubject<string>;
  public currentParticipantNames: Observable<string>;
  private currentDefaultInstanceIdSubject: BehaviorSubject<string>;
  public currentDefaultInstanceId: Observable<string>;
  private currentLoginCipherSubject: BehaviorSubject<string>;
  public currentLoginCipher: Observable<string>;
  private currentInstanceIdSubject: BehaviorSubject<string>;
  public currentInstanceId: Observable<string>;
  private currentInstanceSubject: BehaviorSubject<Instance>;
  public currentInstance: Observable<Instance>;
  private currentShoppingSessionSubject: BehaviorSubject<ShoppingSession>;
  public currentShoppingSession: Observable<ShoppingSession>;
  private currentShoppingSessionIdSubject: BehaviorSubject<string>;
  public currentShoppingSessionId: Observable<string>;
  private currentInputEventHandlerSubject: BehaviorSubject<InputEventHandler>;
  public currentInputEventHandler: Observable<InputEventHandler>;
  private currentLoadingSubject: BehaviorSubject<boolean>;
  public currentLoading: Observable<boolean>;
  private currentMessagesSubject: BehaviorSubject<string[]>;
  public currentMessages: Observable<string[]>;

  public messages: Subject<any>;

  constructor(private wsService: WebsocketService) {
    var storedModeString = sessionStorage.getItem('digitalMakerWebsiteMode')
    var storedMode = Mode.NotSelected;
    if (storedModeString != null) {
      if (storedModeString == 'WriteCode') {
        storedMode = Mode.WriteCode;
      } else if (storedModeString == 'Checkout') {
        storedMode = Mode.Checkout;
      } else if (storedModeString == 'CustomerScanner') {
        storedMode = Mode.CustomerScanner;
      }
    }

    var theStoredCurrentMeetingAdminPassword = sessionStorage.getItem('currentMeetingAdminPassword');
    var theStoredCurrentMeetingId = sessionStorage.getItem('currentMeetingId');
    console.log('MeetingId: ' + theStoredCurrentMeetingId);
    var theStoredCurrentMeetingPassword = sessionStorage.getItem('currentMeetingPassword');
    var theStoredCurrentParticipantId = sessionStorage.getItem('currentParticipantId');
    var theStoredCurrentLoginCipher = sessionStorage.getItem('currentLoginCipher');
    var theStoredCurrentInstanceId = sessionStorage.getItem('currentInstanceId');
    var theStoredCurrentShoppingSessionId = sessionStorage.getItem('currentShoppingSessionId');

    this.currentModeSubject = new BehaviorSubject<Mode>(storedMode);
    this.currentMode = this.currentModeSubject.asObservable();
    this.currentMeetingAdminLoggedInSubject = new BehaviorSubject<string>(null);
    this.currentMeetingAdminLoggedIn = this.currentMeetingAdminLoggedInSubject.asObservable();
    this.currentMeetingAdminPasswordSubject = new BehaviorSubject<string>(theStoredCurrentMeetingAdminPassword);
    this.currentMeetingAdminPassword = this.currentMeetingAdminPasswordSubject.asObservable();
    this.currentMeetingIdSubject = new BehaviorSubject<string>(theStoredCurrentMeetingId);
    this.currentMeetingId = this.currentMeetingIdSubject.asObservable();
    this.currentMeetingPasswordSubject = new BehaviorSubject<string>(theStoredCurrentMeetingPassword);
    this.currentMeetingPassword = this.currentMeetingPasswordSubject.asObservable();
    this.currentMeetingNameSubject = new BehaviorSubject<string>(null);
    this.currentMeetingName = this.currentMeetingNameSubject.asObservable();
    this.currentParticipantIdsAndNamesSubject = new BehaviorSubject<ParticipantIdAndName[]>(null);
    this.currentParticipantIdsAndNames = this.currentParticipantIdsAndNamesSubject.asObservable();
    this.currentParticipantIdSubject = new BehaviorSubject<string>(theStoredCurrentParticipantId);
    this.currentParticipantId = this.currentParticipantIdSubject.asObservable();
    this.currentParticipantNamesSubject = new BehaviorSubject<string>(null);
    this.currentParticipantNames = this.currentParticipantNamesSubject.asObservable();
    this.currentDefaultInstanceIdSubject = new BehaviorSubject<string>(null);
    this.currentDefaultInstanceId = this.currentDefaultInstanceIdSubject.asObservable();
    this.currentLoginCipherSubject = new BehaviorSubject<string>(theStoredCurrentLoginCipher);
    this.currentLoginCipher = this.currentLoginCipherSubject.asObservable();
    this.currentInstanceIdSubject = new BehaviorSubject<string>(theStoredCurrentInstanceId);
    this.currentInstanceId = this.currentInstanceIdSubject.asObservable();
    this.currentInstanceSubject = new BehaviorSubject<Instance>(null);
    this.currentInstance = this.currentInstanceSubject.asObservable();
    this.currentInputEventHandlerSubject = new BehaviorSubject<InputEventHandler>(null);
    this.currentInputEventHandler = this.currentInputEventHandlerSubject.asObservable();
    this.currentShoppingSessionIdSubject = new BehaviorSubject<string>(theStoredCurrentShoppingSessionId);
    this.currentShoppingSessionId = this.currentShoppingSessionIdSubject.asObservable();
    this.currentShoppingSessionSubject = new BehaviorSubject<ShoppingSession>(null);
    this.currentShoppingSession = this.currentShoppingSessionSubject.asObservable();
    this.currentLoadingSubject = new BehaviorSubject<boolean>(null);
    this.currentLoading = this.currentLoadingSubject.asObservable();
    this.currentMessagesSubject = new BehaviorSubject<string[]>(null);
    this.currentMessages = this.currentMessagesSubject.asObservable();

    this.messages = <Subject<any>>wsService.connect(WEBSERVICE_URL).pipe(map(
      response => {
        return response.data;
      }
    ));
  }

  public get currentModeValue(): Mode { return this.currentModeSubject.value; }
  public get currentMeetingAdminLoggedInValue(): string { return this.currentMeetingAdminLoggedInSubject.value; }
  public get currentMeetingAdminPasswordValue(): string { return this.currentMeetingAdminPasswordSubject.value; }
  public get currentMeetingIdValue(): string { return this.currentMeetingIdSubject.value; }
  public get currentMeetingPasswordValue(): string { return this.currentMeetingPasswordSubject.value; }
  public get currentMeetingNameValue(): string { return this.currentMeetingNameSubject.value; }  
  public get currentParticipantIdsAndNamesValue(): ParticipantIdAndName[] { return this.currentParticipantIdsAndNamesSubject.value; }
  public get currentParticipantIdValue(): string { return this.currentParticipantIdSubject.value; }
  public get currentParticipantNamesValue(): string { return this.currentParticipantNamesSubject.value; }
  public get currentDefaultInstanceIdValue(): string { return this.currentDefaultInstanceIdSubject.value; }
  public get currentLoginCipherValue(): string { return this.currentLoginCipherSubject.value; }
  public get currentInstanceIdValue(): string { return this.currentInstanceIdSubject.value; }
  public get currentInstanceValue(): Instance { return this.currentInstanceSubject.value; }
  public get currentInputEventHandlerValue(): InputEventHandler { return this.currentInputEventHandlerSubject.value; }
  public get currentShoppingSessionIdValue(): string { return this.currentShoppingSessionIdSubject.value; }
  public get currentShoppingSessionValue(): ShoppingSession { return this.currentShoppingSessionSubject.value; }
  public get currentLoadingValue(): boolean { return this.currentLoadingSubject.value; }
  public get currentMessagesValue(): string[] { return this.currentMessagesSubject.value; }

  leave() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('digitalMakerWebsiteMode');
    sessionStorage.removeItem('currentMeetingAdminPassword');
    sessionStorage.removeItem('currentMeetingId');
    sessionStorage.removeItem('currentMeetingPassword');
    sessionStorage.removeItem('currentParticipantId');
    sessionStorage.removeItem('currentLoginCipher');
    sessionStorage.removeItem('currentInstanceId');
    sessionStorage.removeItem('currentShoppingSessionId');
    this.currentModeSubject.next(null);
    this.currentMeetingAdminLoggedInSubject.next(null);
    this.currentMeetingAdminPasswordSubject.next(null);
    this.currentMeetingIdSubject.next(null);
    this.currentMeetingPasswordSubject.next(null);
    this.currentMeetingNameSubject.next(null);    
    this.currentParticipantIdsAndNamesSubject.next(null);    
    this.currentParticipantIdSubject.next(null);
    this.currentParticipantNamesSubject.next(null);
    this.currentDefaultInstanceIdSubject.next(null);
    this.currentLoginCipherSubject.next(null);
    this.currentInstanceIdSubject.next(null);
    this.currentInstanceSubject.next(null);
    this.currentInputEventHandlerSubject.next(null);
    this.currentShoppingSessionIdSubject.next(null);
    this.currentShoppingSessionSubject.next(null);
    this.currentLoadingSubject.next(false);
  }

  leaveMeeting() {
    // remove user from local storage to log user out
    sessionStorage.removeItem('currentMode');
    sessionStorage.removeItem('currentMeetingId');
    sessionStorage.removeItem('currentMeetingPassword');
    sessionStorage.removeItem('currentParticipantId');
    sessionStorage.removeItem('currentLoginCipher');
    sessionStorage.removeItem('currentInstanceId');
    sessionStorage.removeItem('currentShoppingSessionId');
    this.currentModeSubject.next(null);
    this.currentMeetingIdSubject.next(null);
    this.currentMeetingPasswordSubject.next(null);
    this.currentMeetingNameSubject.next(null);    
    this.currentParticipantIdsAndNamesSubject.next(null);    
    this.currentParticipantIdSubject.next(null);
    this.currentParticipantNamesSubject.next(null);
    this.currentDefaultInstanceIdSubject.next(null);
    this.currentLoginCipherSubject.next(null);
    this.currentInstanceIdSubject.next(null);
    this.currentInstanceSubject.next(null);
    this.currentInputEventHandlerSubject.next(null);
    this.currentShoppingSessionIdSubject.next(null);
    this.currentShoppingSessionSubject.next(null);
    this.currentLoadingSubject.next(false);
  }

  setMode(mode: Mode) {
    sessionStorage.setItem('digitalMakerWebsiteMode', mode);
    this.currentModeSubject.next(mode);
  }

  removeMode() {
    sessionStorage.removeItem('digitalMakerWebsiteMode');
    this.currentModeSubject.next(null);
  }

  setMeetingAdminLoggedIn(meetingAdminLoggedIn: string) {
    this.currentMeetingAdminLoggedInSubject.next(meetingAdminLoggedIn);
  }

  removeMeetingAdminLoggedIn() {
    this.currentMeetingAdminLoggedInSubject.next(null);
  }

  setMeetingAdminPassword(meetingAdminPassword: string) {
    sessionStorage.setItem('currentMeetingAdminPassword', meetingAdminPassword);
    this.currentMeetingAdminPasswordSubject.next(meetingAdminPassword);
  }

  removeMeetingAdminPassword() {
    sessionStorage.removeItem('currentMeetingAdminPassword');
    this.currentMeetingAdminPasswordSubject.next(null);
  }

  setMeetingId(meetingId: string) {
    sessionStorage.setItem('currentMeetingId', meetingId);
    this.currentMeetingIdSubject.next(meetingId);
  }

  setMeetingPassword(meetingPassword: string) {
    sessionStorage.setItem('currentMeetingPassword', meetingPassword);
    this.currentMeetingPasswordSubject.next(meetingPassword);
  }

  setMeetingName(meetingName: string) {
    this.currentMeetingNameSubject.next(meetingName);
  }

  removeMeetingNameAndPassword() {
    sessionStorage.removeItem('currentMeetingPassword');
    this.currentMeetingPasswordSubject.next(null);
    this.currentMeetingNameSubject.next(null);
  }

  setParticipantIdsAndNames(participantIdsAndNames: ParticipantIdAndName[]) {
    this.currentParticipantIdsAndNamesSubject.next(participantIdsAndNames);
  }

  removeParticipantIdsAndNames() {
    this.currentParticipantIdsAndNamesSubject.next(null);
  }

  setParticipantDetails(participantId: string, participantNames: string, defaultInstanceId: string) {
    sessionStorage.setItem('currentParticipantId', participantId);
    this.currentParticipantIdSubject.next(participantId);
    this.currentParticipantNamesSubject.next(participantNames);
    this.currentDefaultInstanceIdSubject.next(defaultInstanceId);
  }

  removeParticipantDetails() {
    sessionStorage.removeItem('currentParticipantId');
    sessionStorage.removeItem('currentLoginCipher');
    this.currentParticipantIdSubject.next(null);
    this.currentParticipantNamesSubject.next(null);
    this.currentDefaultInstanceIdSubject.next(null);
    this.currentLoginCipherSubject.next(null);
  }

  setLoginCipher(loginCipher: string) {
    sessionStorage.setItem('currentLoginCipher', loginCipher);
    this.currentLoginCipherSubject.next(loginCipher);
  }

  removeLoginCipher() {
    sessionStorage.removeItem('currentLoginCipher');
    this.currentLoginCipherSubject.next(null);
  }

  setInstance(instance: Instance) {
    sessionStorage.setItem('currentInstanceId', instance.instanceId);
    this.currentInstanceIdSubject.next(instance.instanceId);
    this.currentInstanceSubject.next(instance);
  }

  removeInstance() {
    sessionStorage.removeItem('currentInstanceId');
    this.currentInstanceIdSubject.next(null);
    this.currentInstanceSubject.next(null);
  }

  setShoppingSession(shoppingSession: ShoppingSession) {
    sessionStorage.setItem('currentShoppingSessionId', shoppingSession.shoppingSessionId);
    this.currentShoppingSessionIdSubject.next(shoppingSession.shoppingSessionId);
    this.currentShoppingSessionSubject.next(shoppingSession);
  }

  removeShoppingSession() {
    sessionStorage.removeItem('currentShoppingSessionId');
    this.currentShoppingSessionIdSubject.next(null);
    this.currentShoppingSessionSubject.next(null);
  }

  setInputEventHandler(inputEventHandler: InputEventHandler) {
    this.currentInputEventHandlerSubject.next(inputEventHandler);
  }

  removeInputEventHandler() {
    sessionStorage.removeItem('currentInputEventHandler');
    this.currentInputEventHandlerSubject.next(null);
  }

  setLoading(b: boolean) {
    this.currentLoadingSubject.next(b);
  }

  addNewMessage(message: string) {
    var messages = this.currentMessagesValue;
    messages.push(message);
    this.currentMessagesSubject.next(messages);
  }

  loginMeetingAdmin(meetingAdminPassword: string) {
    // Store the meeting admin password here, as the response item does not return it.
    this.setMeetingAdminPassword(meetingAdminPassword);

    // Remove current stored data, this will be reassigned if and when the request returns
    this.removeMeetingAdminLoggedIn();
    this.leaveMeeting();

    let loginMeetingRequest: LoginMeetingAdminRequest = {
      meetingAdminPassword: meetingAdminPassword
    };
    let loginMeetingAdminRequestJson = JSON.stringify(loginMeetingRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.LoginMeetingAdmin, content: loginMeetingAdminRequestJson };
    this.messages.next(requestWrapper);
  }

  createMeeting(meetingId: string, meetingName: string, meetingPassword: string) {
    // Remove current stored data, this will be reassigned if and when the request returns
    this.leaveMeeting();

    let createMeetingRequest: CreateMeetingRequest = {
      meetingId: meetingId,
      meetingName: meetingName,
      meetingPassword: meetingPassword,
      meetingAdminPassword: this.currentMeetingAdminPasswordValue
    };
    let createMeetingRequestJson = JSON.stringify(createMeetingRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.CreateMeeting, content: createMeetingRequestJson };
    this.messages.next(requestWrapper);
  }

  joinMeetingAsAdmin(meetingId: string) {
    // Remove current stored data, this will be reassigned if and when the request returns
    this.leaveMeeting();

    let joinMeetingAsAdminRequest: JoinMeetingAsAdminRequest = {
      meetingId: meetingId,
      meetingAdminPassword: this.currentMeetingAdminPasswordValue
    };
    let joinMeetingAsAdminRequestJson = JSON.stringify(joinMeetingAsAdminRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.JoinMeetingAsAdmin, content: joinMeetingAsAdminRequestJson };
    this.messages.next(requestWrapper);
  }

  joinMeeting(meetingPassword: string) {
    var meetingId = this.currentMeetingIdValue;
    
    // Remove current stored data, this will be reassigned if and when the request returns
    this.removeMeetingNameAndPassword();
    this.removeParticipantDetails();
    this.removeInstance();
    this.removeShoppingSession();

    // Store the meeting password though, as nobody else stores it
    this.setMeetingPassword(meetingPassword);

    let joinMeetingRequest: JoinMeetingRequest = {
      meetingId: meetingId,
      meetingPassword: meetingPassword
    };
    let joinMeetingRequestJson = JSON.stringify(joinMeetingRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.JoinMeeting, content: joinMeetingRequestJson };
    this.messages.next(requestWrapper);
  }

  getParticipantsForMeeting() {
    var meetingId = this.currentMeetingIdValue;
    var meetingPassword = this.currentMeetingPasswordValue;
    
    let joinMeetingRequest: JoinMeetingRequest = {
      meetingId: meetingId,
      meetingPassword: meetingPassword
    };
    let joinMeetingRequestJson = JSON.stringify(joinMeetingRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.JoinMeeting, content: joinMeetingRequestJson };
    this.messages.next(requestWrapper);
  }

  joinNewParticipant(participantId: string, participantNames: string, participantPassword: string, loginCipher: string) {
    // Remove current stored data, this will be reassigned if and when the request returns
    this.removeParticipantDetails();
    this.removeInstance();
    this.removeShoppingSession();

    let joinNewParticipantRequest: JoinNewParticipantRequest = {
      meetingId: this.currentMeetingIdValue,
      meetingPassword: this.currentMeetingPasswordValue,
      participantId: participantId,
      participantNames: participantNames,
      participantPassword: participantPassword,
      loginCipher: loginCipher
    };
    let joinNewParticipantRequestJson = JSON.stringify(joinNewParticipantRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.JoinNewParticipant, content: joinNewParticipantRequestJson };
    this.messages.next(requestWrapper);
  }

  rejoinMeetingAndParticipantWithLoginCipher() {
    let rejoinMeetingAndParticipantWithLoginCipherRequest: RejoinMeetingAndParticipantWithLoginCipherRequest = {
      meetingId: this.currentMeetingIdValue,
      participantId: this.currentParticipantIdValue,
      loginCipher: this.currentLoginCipherValue
    };
    let rejoinMeetingAndParticipantWithLoginCipherRequestJson = JSON.stringify(rejoinMeetingAndParticipantWithLoginCipherRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.RejoinMeetingAndParticipantWithLoginCipher, content: rejoinMeetingAndParticipantWithLoginCipherRequestJson };
    this.messages.next(requestWrapper);
  }
  
  rejoinParticipantWithPassword(meetingPassword: string, participantPassword: string, newLoginCipher: string) {
    // Remove current stored data, this will be reassigned if and when the request returns
    this.removeParticipantDetails();
    this.removeInstance();
    this.removeShoppingSession();

    let rejoinParticipantWithPasswordRequest: RejoinParticipantWithPasswordRequest = {
      meetingId: this.currentMeetingIdValue,
      meetingPassword: meetingPassword,
      participantId: this.currentParticipantIdValue,
      participantPassword: participantPassword,
      newLoginCipher: newLoginCipher
    };
    let rejoinParticipantWithPasswordRequestJson = JSON.stringify(rejoinParticipantWithPasswordRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.RejoinParticipantWithPassword, content: rejoinParticipantWithPasswordRequestJson };
    this.messages.next(requestWrapper);
  }  

  getOrCreateInstance() {
    // Remove current stored data, this will be reassigned if and when the request returns
    this.removeInstance();
    this.removeShoppingSession();

    let getOrCreateInstanceRequest: GetOrCreateInstanceRequest = {
      meetingId: this.currentMeetingIdValue,
      participantId: this.currentParticipantIdValue,
      loginCipher: this.currentLoginCipherValue
    };
    let getOrCreateInstanceRequestJson = JSON.stringify(getOrCreateInstanceRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.GetOrCreateInstance, content: getOrCreateInstanceRequestJson };
    this.messages.next(requestWrapper);
  }

  startCheckout(shoppingSessionId: string, instanceId: string, shopperName: string) {
    // Remove current stored data, this will be reassigned if and when the request returns
    this.removeInstance();
    this.removeShoppingSession();

    let startCheckoutRequest: StartCheckoutRequest = {
      shoppingSessionId: shoppingSessionId,
      instanceId: instanceId,
      shopperName: shopperName,
      meetingId: this.currentMeetingIdValue,
      participantId: this.currentParticipantIdValue,
      loginCipher: this.currentLoginCipherValue
    };
    let startCheckoutRequestJson = JSON.stringify(startCheckoutRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.StartCheckout, content: startCheckoutRequestJson };
    this.messages.next(requestWrapper);
  }

  reconnectCheckout(shoppingSessionId: string) {
    // Remove current stored data, this will be reassigned if and when the request returns
    this.removeInstance();
    this.removeShoppingSession();

    let reconnectCheckoutRequest = {
      shoppingSessionId: shoppingSessionId
    };
    let reconnectCheckoutRequestJson = JSON.stringify(reconnectCheckoutRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.ReconnectCheckout, content: reconnectCheckoutRequestJson };
    this.messages.next(requestWrapper);
  }

  connectCustomerScanner(shoppingSessionId: string) {
    // Remove current stored data, this will be reassigned if and when the request returns
    this.removeInstance();
    this.removeShoppingSession();

    let connectCustomerScannerRequest = {
      shoppingSessionId: shoppingSessionId
    };
    let connectCustomerScannerRequestJson = JSON.stringify(connectCustomerScannerRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.ConnectCustomerScanner, content: connectCustomerScannerRequestJson };
    this.messages.next(requestWrapper);
  }

  reconnectInstanceAdmin(instanceId: string) {
    // Remove current stored data, this will be reassigned if and when the request returns
    this.removeInstance();
    this.removeShoppingSession();

    let reconnectInstanceAdminRequest = {
      instanceId: instanceId
    };
    let reconnectInstanceAdminRequestJson = JSON.stringify(reconnectInstanceAdminRequest);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.ReconnectInstanceAdmin, content: reconnectInstanceAdminRequestJson };
    this.messages.next(requestWrapper);
  }

  addNewInputEventHandler(inputEventHandlerName: string) {
    let request: AddNewInputEventHandlerRequest = {
      instanceId: this.currentInstanceIdValue,
      inputEventHandlerName: inputEventHandlerName,
      meetingId: this.currentMeetingIdValue,
      participantId: this.currentParticipantIdValue,
      loginCipher: this.currentLoginCipherValue
    };
    let requestJson = JSON.stringify(request);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.AddNewInputEventHandler, content: requestJson };
    this.messages.next(requestWrapper);
  }

  addNewVariable(variableName: string) {
    let request: AddNewVariableRequest = {
      instanceId: this.currentInstanceIdValue,
      variableName: variableName,
      meetingId: this.currentMeetingIdValue,
      participantId: this.currentParticipantIdValue,
      loginCipher: this.currentLoginCipherValue
    };
    let requestJson = JSON.stringify(request);
    
    var requestWrapper: RequestWrapper = { requestType: RequestType.AddNewVariable, content: requestJson };
    this.messages.next(requestWrapper);
  }
}