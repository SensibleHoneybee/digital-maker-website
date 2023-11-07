import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Instance } from '../_models/instance';
import { Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MainService } from '../_services/main.service';
import { Router } from '@angular/router';
import { InputReceivedRequest } from '../_requests/InputReceivedRequest';

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
  closeResult = '';
  dialogTitle = '';
  dialogLabel = '';
  currentConsoleOutputText = '';
  currentInputTab = 0;
  currentOutputTab = 0;
  loading = false;
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
  }

  inputButtonClicked(colour: string) {
    let inputReceivedRequest: InputReceivedRequest = {
      instanceId: this.currentInstance.instanceId,
      inputName: 'Button pressed',
      data: colour
    };

    this.mainService.inputReceived(inputReceivedRequest)
  }
}
