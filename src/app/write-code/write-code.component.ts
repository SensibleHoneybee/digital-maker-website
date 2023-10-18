import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { InputEventHandler } from '../_models/input-event-handler';
import { Instance } from '../_models/instance';
import { MainService } from '../_services/main.service';
import { DigitalMakerResponseType } from '../digital-maker-response-type';

@Component({
  selector: 'app-write-code',
  templateUrl: './write-code.component.html',
  styleUrls: ['./write-code.component.css']
})
export class WriteCodeComponent implements OnInit {
  writeCodeForm: FormGroup;
  currentInstance: Instance;
  currentInstanceSubscription: Subscription;
  newUserMessageSubscription: Subscription;
  currentLoadingSubscription: Subscription;
  currentInternalMessageSubscription: Subscription;
  currentInputEventHandler: InputEventHandler;
  unusedInputEventHandlers: InputEventHandler[];
  closeResult = '';
  dialogTitle = '';
  currentCode = '';
  inputEventHandlerToSet = '';
  messageFeed = '';
  stopRunningInitiated = false;
  loadingMessage = '';
  loading = false;
  @ViewChild('modalDialog') modalDialog: any;
  @ViewChild('modalRunCode') modalRunCode: any;
  @ViewChild('modalLoading') modalLoading: any;
  @ViewChild("codingWindow") codingWindow: ElementRef;
  @ViewChild("messagesWindow") messagesWindow: ElementRef;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private mainService: MainService, private router: Router) {
    this.currentInstanceSubscription = mainService.currentInstance.subscribe(x => {
      this.currentInstance = x;
      this.currentInputEventHandler = null;
      if (x != null) {
        if (this.inputEventHandlerToSet != null && this.inputEventHandlerToSet != '') {
          let iii = 0;
          while (iii < x.inputEventHandlers.length) {
            if (x.inputEventHandlers[iii].nameOfEvent == this.inputEventHandlerToSet) {
              this.currentInputEventHandler = x.inputEventHandlers[iii];
              this.currentCode = x.inputEventHandlers[iii].pythonCode;
              this.codingWindow.nativeElement.focus();
            }
            iii++;
          }
        }
        this.unusedInputEventHandlers = this.mainService.getDefaultInputEventHandlers();
        let i = this.unusedInputEventHandlers.length - 1;
        while (i >= 0) {
          let j = 0;
          while (j < x.inputEventHandlers.length) {
            if (this.unusedInputEventHandlers[i].nameOfEvent == x.inputEventHandlers[j].nameOfEvent) {
              // Event is in the list. Remove it from unused list.
              this.unusedInputEventHandlers.splice(i, 1);
              break;
            }
            j++;
          }
          i--;
        }
      }
      
      if (this.currentInputEventHandler == null) {
        this.setInputEventHandlerFirstOrNull();
      }

      this.inputEventHandlerToSet = this.currentInputEventHandler?.nameOfEvent;
    });
    this.currentLoadingSubscription = mainService.currentLoading.subscribe(b => {
      this.loading = b;
      if (b) {
        this.modalService.open(this.modalLoading, {ariaLabelledBy: 'modal-basic-title'});
      } else {
        this.modalService.dismissAll();
      }
    });
    this.currentInternalMessageSubscription = mainService.currentInternalMessage.subscribe(msg => {
      // Listen for instance does not exist messages
      if (msg == DigitalMakerResponseType.InstanceDoesNotExist) {
        this.router.navigate(['/create-new-instance', this.mainService.currentInstanceIdValue]);
      }
    });
    this.newUserMessageSubscription = mainService.newUserMessage.subscribe(msg => {
      if (this.messageFeed != '') {
        this.messageFeed = this.messageFeed + '\n'; 
      }
      this.messageFeed = this.messageFeed + '• ' + msg;
      this.messagesWindow.nativeElement.focus();
      this.messagesWindow.nativeElement.scrollTop = this.messagesWindow.nativeElement.scrollHeight;
    });
  }

  ngOnInit(): void {
    this.writeCodeForm = this.formBuilder.group({
      inputCode: ['', Validators.required]
    });
  }

  ngAfterViewInit(): void {
    this.loadingMessage = 'Loading, please wait...';
    this.mainService.setLoading(true);
    this.mainService.connectToInstance();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentInstanceSubscription.unsubscribe();
    this.newUserMessageSubscription.unsubscribe();
    this.currentLoadingSubscription.unsubscribe();
    this.currentInternalMessageSubscription.unsubscribe();
  }

  setInputEventHandlerFirstOrNull(): void {
    if (this.currentInstance == null) {
      this.currentInputEventHandler = null;
      this.currentCode = null;
      return;
    }

    var inputEventHandler = this.currentInstance.inputEventHandlers.length > 0 ? this.currentInstance.inputEventHandlers[0] : null
    this.currentInputEventHandler = inputEventHandler;
    this.currentCode = inputEventHandler.pythonCode;
    this.codingWindow.nativeElement.focus();
  }
  
  selectNewInputEventHandler(inputEventHandler: InputEventHandler): void {
    this.inputEventHandlerToSet = inputEventHandler.nameOfEvent;

    if (this.currentCode != this.currentInputEventHandler.pythonCode) {
      // Before selecting the new input handler, save the code and wait for the instance to return
      this.loadingMessage = 'Saving code, please wait...';
      this.mainService.setLoading(true);
      this.mainService.updateCode(this.currentInputEventHandler.nameOfEvent, this.currentCode);
    } else {
      // If no need to save, just set the new one directly
      this.currentInputEventHandler = inputEventHandler;
      this.currentCode = inputEventHandler.pythonCode;
      this.codingWindow.nativeElement.focus();
    }
  }

  deleteInputEventHandler(inputEventHandler: InputEventHandler): void {
    let text = 'Are you sure you wish to delete ' + inputEventHandler.nameOfEvent + '?\nClick OK to delete, or Cancel if you do not wish to delete.';
    if (confirm(text) == true) {
      this.loadingMessage = 'Deleting event handler, please wait...';
      this.mainService.setLoading(true);
      this.mainService.deleteInputEventHandler(inputEventHandler);
      if (this.currentInputEventHandler == inputEventHandler)
      {
        // Set the first one to be the current
        this.setInputEventHandlerFirstOrNull();
      }
    } else {
      // Exit.
    }
  }

  showNewInputEventHandlerDialog() {
    this.dialogTitle = 'Add new input event'
    this.modalService.open(this.modalDialog, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
    }, (reason) => {
      // No need to do anything if the user cancels
    });
  }

  addNewInputEventHandler(inputEventHandler: InputEventHandler): void {
    this.loadingMessage = 'Adding new input handler, please wait...';
    this.mainService.setLoading(true);
    this.mainService.addNewInputEventHandler(inputEventHandler);
  }

  saveCode(): void {
    if (this.currentCode == this.currentInputEventHandler.pythonCode) {
      // Nothing to be done.
      return;
    }

    this.loadingMessage = 'Saving code, please wait...';
    this.mainService.setLoading(true);
    this.mainService.updateCode(this.currentInputEventHandler.nameOfEvent, this.currentCode);
  }

  revertCode(): void {
    this.currentCode = this.currentInputEventHandler.pythonCode;
    this.codingWindow.nativeElement.focus();
  }

  runCode(): void {
    this.loadingMessage = 'Preparing to run code, please wait...';
    this.mainService.setLoading(true);
    this.mainService.runCode(true);
  }

  stopRunningCode(): void {
    this.stopRunningInitiated = true;
    this.loadingMessage = 'Preparing to stop running code, please wait...';
    this.mainService.setLoading(true);
    this.mainService.runCode(false);
  }

  closeRunningCodeWindow(): void {
    this.stopRunningInitiated = false;
  }
}
