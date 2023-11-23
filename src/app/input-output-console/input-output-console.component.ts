import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Instance } from '../_models/instance';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainService } from '../_services/main.service';
import { Router } from '@angular/router';
import { InputReceivedRequest } from '../_requests/InputReceivedRequest';
import { DigitalMakerResponseType } from '../digital-maker-response-type';

@Component({
  selector: 'app-input-output-console',
  templateUrl: './input-output-console.component.html',
  styleUrls: ['./input-output-console.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class InputOutputConsoleComponent implements OnInit {
  modalForm: FormGroup;
  currentInstance: Instance;
  currentInstanceSubscription: Subscription;
  currentLoadingSubscription: Subscription;
  currentErrorMessageSubscription: Subscription;
  currentConsoleOutputTextSubscription: Subscription;
  currentPlaySoundSubscription: Subscription;
  currentInternalMessageSubscription: Subscription;
  closeResult = '';
  dialogTitle = '';
  dialogLabel = '';
  currentConsoleOutputText = '';
  currentPlaySound = '';
  currentInputTab = 0;
  currentOutputTab = 0;
  spiderTop = 50;
  spiderLeft = 50;
  loading = false;
  instanceDoesNotExist = false;
  @ViewChild('modalDialog') modalDialog: any;
  @ViewChild('modalLoading') modalLoading: any;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private mainService: MainService, private router: Router) { 
    this.currentInstanceSubscription = mainService.currentInstance.subscribe(x => {
      this.currentInstance = x;
    });
    this.currentLoadingSubscription = mainService.currentLoading.subscribe(b => {
      this.loading = b;
      if (b) {
        this.modalService.open(this.modalLoading, {ariaLabelledBy: 'modal-basic-title'});
      } else {
        this.modalService.dismissAll();
      }
    });
    this.currentErrorMessageSubscription = mainService.currentErrorMessage.subscribe(errorMessage => {
      if (errorMessage != null && errorMessage != '') {
        this.router.navigate(['error-page']);
      }
    });
    this.currentConsoleOutputTextSubscription = mainService.currentConsoleOutputText.subscribe(x => {
      this.currentConsoleOutputText = x;
    });
    this.currentPlaySoundSubscription = mainService.currentPlaySound.subscribe(x => {
      if (x != null && x != '') {
        this.playSound(x);
      }
    });
    this.currentInternalMessageSubscription = mainService.currentInternalMessage.subscribe(msg => {
      // Listen for instance does not exist messages
      if (msg == DigitalMakerResponseType.InstanceDoesNotExist) {
        this.instanceDoesNotExist = true;
      } else if (msg.substring(0, 11) == 'move-spider') {
        switch (msg.substring(12))
        {
          case 'left':
            this.spiderLeft -=5;
            break;
          case 'right':
            this.spiderLeft +=5;
            break;
          case 'up':
            this.spiderTop -=5;
            break;
          case 'down':
            this.spiderTop +=5;
            break;
        }
      }
    });
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mainService.setLoading(true);
    this.mainService.connectInputOutputDevice();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentInstanceSubscription.unsubscribe();
    this.currentLoadingSubscription.unsubscribe();
    this.currentErrorMessageSubscription.unsubscribe();
    this.currentConsoleOutputTextSubscription.unsubscribe();
    this.currentPlaySoundSubscription.unsubscribe();
    this.currentInternalMessageSubscription.unsubscribe();
  }

  inputButtonClicked() {
    let inputReceivedRequest: InputReceivedRequest = {
      instanceId: this.currentInstance.instanceId,
      inputName: 'Button pressed',
      data: ''
    };

    this.mainService.inputReceived(inputReceivedRequest)
  }

  gameControllerButtonClicked(button: string) {
    let inputReceivedRequest: InputReceivedRequest = {
      instanceId: this.currentInstance.instanceId,
      inputName: 'Game controller',
      data: button
    };

    this.mainService.inputReceived(inputReceivedRequest)
  }

  playSound(soundName: string) {
    let audio = new Audio();
    audio.src = 'assets/sounds/' + soundName + '.mp3';
    audio.load();
    audio.play();
  }
}
