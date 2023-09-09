import { Component, ɵsetAllowDuplicateNgModuleIdsForTest } from '@angular/core';
import { Subscription } from 'rxjs';
import { DigitalMakerResponseType } from './digital-maker-response-type';
import { ResponseWrapper } from './response-wrapper';
import { Mode } from './_models/mode';
import { ErrorResponse } from './_responses/error-response';
import { FullInstanceResponse } from './_responses/full-instance-response';
import { FullShoppingSessionResponse } from './_responses/full-shopping-session-response';
import { SuccessResponse } from './_responses/success-response';
import { MainService } from './_services/main.service';
import { MeetingOnlyResponse } from './_responses/meeting-only-response';
import { MeetingWithParticipantResponse } from './_responses/meeting-with-participant-response';
import { ParticipantIdsAndNamesResponse } from './_responses/participant-ids-and-names-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Card Games';
  currentMode: Mode;
  currentModeSubscription: Subscription;
  currentMeetingId: string;
  currentMeetingIdSubscription: Subscription;
  currentInstanceId: string;
  currentInstanceIdSubscription: Subscription;
  currentShoppingSessionId: string;
  currentShoppingSessionIdSubscription: Subscription;

  constructor(private mainService: MainService) {
    this.currentModeSubscription = mainService.currentMode.subscribe(x => {
      this.currentMode = x;
    });
    this.currentMeetingIdSubscription = mainService.currentMeetingId.subscribe(x => {
      this.currentMeetingId = x;
    });
    this.currentInstanceIdSubscription = mainService.currentInstanceId.subscribe(x => {
      this.currentInstanceId = x;
    });
    this.currentShoppingSessionIdSubscription = mainService.currentShoppingSessionId.subscribe(x => {
      this.currentShoppingSessionId = x;
    });

    mainService.messages.subscribe(msg => {
      var responseWrapper = new ResponseWrapper().deserialize(JSON.parse(msg));
      switch (responseWrapper.responseType) {
        case DigitalMakerResponseType.MeetingAdminLoggedIn:
          this.mainService.setMeetingAdminLoggedIn("true");
          break;
        case DigitalMakerResponseType.MeetingOnly:
          var meetingOnlyResponse = new MeetingOnlyResponse().deserialize(JSON.parse(responseWrapper.content));
          this.mainService.setMeetingName(meetingOnlyResponse.meetingName);
          break;
        case DigitalMakerResponseType.MeetingWithParticipant:
          var meetingWithParticipantResponse = new MeetingWithParticipantResponse().deserialize(JSON.parse(responseWrapper.content));
          this.mainService.setMeetingName(meetingWithParticipantResponse.meetingName);
          this.mainService.setLoginCipher(meetingWithParticipantResponse.loginCipher);
          this.mainService.setParticipantDetails(meetingWithParticipantResponse.participantId, meetingWithParticipantResponse.participantNames, meetingWithParticipantResponse.defaultInstanceId);
          break;
        case DigitalMakerResponseType.ParticipantIdsAndNames:
          var participantIdsAndNamesResponse = new ParticipantIdsAndNamesResponse().deserialize(JSON.parse(responseWrapper.content));
          this.mainService.setParticipantIdsAndNames(participantIdsAndNamesResponse.participantIdsAndNames);
          break;
        case DigitalMakerResponseType.FullInstance:
          var fullInstanceResponse = new FullInstanceResponse().deserialize(JSON.parse(responseWrapper.content));
          this.mainService.setInstance(fullInstanceResponse.instance);
          break;
        case DigitalMakerResponseType.FullShoppingSession:
          var fullShoppingSessionResponse = new FullShoppingSessionResponse().deserialize(JSON.parse(responseWrapper.content));
          if (fullShoppingSessionResponse.instance.instanceId === this.currentInstanceId
            && fullShoppingSessionResponse.shoppingSession.shoppingSessionId === this.currentShoppingSessionId)
          {
            this.mainService.setInstance(fullShoppingSessionResponse.instance);
            this.mainService.setShoppingSession(fullShoppingSessionResponse.shoppingSession);
          }
          break;
        case DigitalMakerResponseType.NoInputHandler:
          break;
        case DigitalMakerResponseType.OutputAction:
          break;
        case DigitalMakerResponseType.Error:
          var errorResponse = new ErrorResponse().deserialize(JSON.parse(responseWrapper.content));
          if (errorResponse != null) {
            alert('An error occurred: ' + errorResponse.message);
          } else {
            alert('An error occurred with null errorResponse');
          }
          break;
        case DigitalMakerResponseType.Success:
          var successResponse = new SuccessResponse().deserialize(JSON.parse(responseWrapper.content));
          if (successResponse != null) {
            alert('Your request completed successfully: ' + successResponse.message);
          } else {
            alert('Your request completed successfully');
          }
          break;
        default:
          // Not interested in other message types
          alert('Unknown message type: ' + responseWrapper.responseType);
          break;
      }
      this.mainService.setLoading(false);
    });
  }

  ngOnInit() {
    if (this.currentMode != null) {
      // Reload the relevant information
      switch (this.currentMode) {
        case Mode.WriteCode: { 
          this.mainService.reconnectInstanceAdmin(this.currentInstanceId);
          break;
        }
        case Mode.CustomerScanner: { 
          this.mainService.connectCustomerScanner(this.currentShoppingSessionId);
          break;
        } 
        case Mode.Checkout: { 
          this.mainService.reconnectCheckout(this.currentInstanceId);
          break;
        }
      }
    }
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentModeSubscription.unsubscribe();
    this.currentInstanceIdSubscription.unsubscribe();
    this.currentShoppingSessionIdSubscription.unsubscribe();
  }
}
