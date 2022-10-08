import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InputEventHandler } from '../_models/input-event-handler';
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
  currentInputEventHandler: InputEventHandler;
  closeResult = '';
  dialogTitle = '';
  dialogLabel = '';
  @ViewChild('modalDialog') modalDialog: any;

  constructor(private modalService: NgbModal, private formBuilder: FormBuilder, private mainService: MainService) { }

  ngOnInit(): void {
    this.modalForm = this.formBuilder.group({
      inputText: ['', Validators.required]
    });
    this.writeCodeForm = this.formBuilder.group({
      inputCode: ['', Validators.required]
    });
  }

  // convenience getter for easy access to form fields
  get f():any { return this.modalForm.controls; }

  setCurrentInputEventHandler(inputEventHandler: InputEventHandler): void {
    this.currentInputEventHandler = inputEventHandler;
  }

  addNewInputEventHandler() {
    this.dialogTitle = 'Add New Input Event'
    this.dialogLabel = 'Please enter the name of the Input Event';
    this.modalService.open(this.modalDialog, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      if (result == 'Save click') {
        //this.mainService.addNewInputEventHandler()
        let newEventHandler: InputEventHandler = { nameOfEvent: this.f.inputText.value, pythonCode: '' };
        alert('Fishy ' + this.f.inputText.value);
      }
    }, (reason) => {
      // No need to do anything if the user cancels
    });
  }
}
