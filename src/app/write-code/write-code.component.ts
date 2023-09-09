import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { InputEventHandler } from '../_models/input-event-handler';
import { Instance } from '../_models/instance';
import { Mode } from '../_models/mode';
import { Variable } from '../_models/variable';
import { MainService } from '../_services/main.service';

@Component({
  selector: 'app-write-code',
  templateUrl: './write-code.component.html',
  styleUrls: ['./write-code.component.css']
})
export class WriteCodeComponent implements OnInit {
  modalForm: FormGroup;
  writeCodeForm: FormGroup;
  inputEventHandlers: InputEventHandler[];
  variables: Variable[];
  currentMode: Mode;
  currentModeSubscription: Subscription;
  currentInstance: Instance;
  currentInstanceSubscription: Subscription;
  currentLoadingSubscription: Subscription;
  currentInputEventHandler: InputEventHandler;
  currentVariable: Variable;
  closeResult = '';
  dialogTitle = '';
  dialogLabel = '';
  loading = false;
  @ViewChild('modalDialog') modalDialog: any;
  @ViewChild('loadingBox') loadingBox: any;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private mainService: MainService, private router: Router) {
    this.currentModeSubscription = mainService.currentMode.subscribe(x => {
      this.currentMode = x;
    });
    this.currentInstanceSubscription = mainService.currentInstance.subscribe(x => {
      this.currentInstance = x;
    });
    this.currentLoadingSubscription = mainService.currentLoading.subscribe(b => {
      this.loading = b;
      if (b) {
        this.modalService.open(this.loadingBox, {ariaLabelledBy: 'modal-basic-title'});
      } else {
        this.modalService.dismissAll();
      }
    });
  }

  ngOnInit(): void {
    if (this.mainService.currentMeetingIdValue == null) {
      // If we're not in a meeting, we can't create a project
      this.router.navigate(['/']);
      return;
    }
    if (this.mainService.currentModeValue != Mode.MeetingAdmin && this.mainService.currentModeValue != Mode.NotSelected) {
      if (confirm("You have been working in the " + this.mainService.currentModeValue + "screen.\r\nAre you sure to want to leave that screen and work on the meeting admin screen?")) {
        this.mainService.leaveMeeting();
      } else {
        this.router.navigate(['/']);
        return;
      }
    }
    this.mainService.setLoading(true);
    this.mainService.rejoinMeetingAndParticipantWithLoginCipher();

    this.modalForm = this.formBuilder.group({
      inputText: ['', Validators.required]
    });
    this.writeCodeForm = this.formBuilder.group({
      inputCode: ['', Validators.required]
    });
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentModeSubscription.unsubscribe();
    this.currentInstanceSubscription.unsubscribe();
  }

  // convenience getter for easy access to form fields
  get f():any { return this.modalForm.controls; }

  setCurrentInputEventHandler(inputEventHandler: InputEventHandler): void {
    this.currentInputEventHandler = inputEventHandler;
  }

  setCurrentVariable(variable: Variable): void {
    this.currentVariable = variable;
  }

  addNewInputEventHandler() {
    this.dialogTitle = 'Add new input event'
    this.dialogLabel = 'Please enter the name of the input event';
    this.modalService.open(this.modalDialog, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result == 'Save click') {
        this.mainService.addNewInputEventHandler(this.f.inputText.value);
      }
    }, (reason) => {
      // No need to do anything if the user cancels
    });
  }

  addNewVariable() {
    this.dialogTitle = 'Add new variable'
    this.dialogLabel = 'Please enter the name of the variable';
    this.modalService.open(this.modalDialog, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result == 'Save click') {
        this.mainService.addNewVariable(this.f.inputText.value);
      }
    }, (reason) => {
      // No need to do anything if the user cancels
    });
  }
}
