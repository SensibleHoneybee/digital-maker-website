import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DigitalMakerResponseType } from './digital-maker-response-type';
import { ResponseWrapper } from './response-wrapper';
import { ErrorResponse } from './_responses/error-response';
import { FullInstanceResponse } from './_responses/full-instance-response';
import { SuccessResponse } from './_responses/success-response';
import { UserMessageResponse } from './_responses/user-message-response';
import { MainService } from './_services/main.service';
import { NoInputHandlerResponse } from './_responses/no-input-handler-response';
import { OutputActionResponse } from './_responses/output-action-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Digital Maker';
  currentInstanceId: string;
  currentInstanceIdSubscription: Subscription;

  constructor(private mainService: MainService) {
    this.currentInstanceIdSubscription = mainService.currentInstanceId.subscribe(x => {
      this.currentInstanceId = x;
    });

    mainService.messages.subscribe(msg => {
      var responseWrapper = new ResponseWrapper().deserialize(JSON.parse(msg));
      switch (responseWrapper.responseType) {
        case DigitalMakerResponseType.FullInstance:
          var fullInstanceResponse = new FullInstanceResponse().deserialize(JSON.parse(responseWrapper.content));
          this.mainService.setInstance(fullInstanceResponse.instance);
          break;
        case DigitalMakerResponseType.InstanceCreated:
          this.mainService.sendInternalMessage(DigitalMakerResponseType.InstanceCreated);
          break;
        case DigitalMakerResponseType.InstanceDoesNotExist:
          this.mainService.sendInternalMessage(DigitalMakerResponseType.InstanceDoesNotExist);
          break;
        case DigitalMakerResponseType.NoInputHandler:
          var noInputHandlerResponse = new NoInputHandlerResponse().deserialize(JSON.parse(responseWrapper.content));
          alert('No input handler');
          break;
        case DigitalMakerResponseType.OutputAction:
          var outputActionResponse = new OutputActionResponse().deserialize(JSON.parse(responseWrapper.content));
          this.mainService.setConsoleOutputText(outputActionResponse.data);
          break;
        case DigitalMakerResponseType.UserMessage:
          var messageResponse = new UserMessageResponse().deserialize(JSON.parse(responseWrapper.content));
          this.mainService.addNewUserMessage(messageResponse.message);
          break;
        case DigitalMakerResponseType.Error:
          var errorResponse = new ErrorResponse().deserialize(JSON.parse(responseWrapper.content));
          alert('Error\n' + errorResponse.message);
          if (errorResponse != null) {
            this.mainService.setErrorMessage('An error occurred: ' + errorResponse.message);
          } else {
            this.mainService.setErrorMessage('An error occurred with null errorResponse');
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
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentInstanceIdSubscription.unsubscribe();
  }
}
