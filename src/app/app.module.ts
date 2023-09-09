import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CustomerScannerComponent } from './customer-scanner/customer-scanner.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { WriteCodeComponent } from './write-code/write-code.component';
import { InputEventHandlersComponent } from './input-event-handlers/input-event-handlers.component';
import { LoginMeetingAdminComponent } from './login-meeting-admin/login-meeting-admin.component';
import { LoginMeetingComponent } from './login-meeting/login-meeting.component';
import { MeetingAdminComponent } from './meeting-admin/meeting-admin.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { LoginParticipantNewComponent } from './login-participant-new/login-participant-new.component';
import { LoginParticipantExistingComponent } from './login-participant-existing/login-participant-existing.component';
import { LoginParticipantStartScreenComponent } from './login-participant-start-screen/login-participant-start-screen.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SelectParticipantComponent } from './select-participant/select-participant.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CustomerScannerComponent,
    CheckoutComponent,
    WriteCodeComponent,
    InputEventHandlersComponent,
    LoginMeetingAdminComponent,
    LoginMeetingComponent,
    MeetingAdminComponent,
    CreateMeetingComponent,
    LoginParticipantNewComponent,
    LoginParticipantExistingComponent,
    LoginParticipantStartScreenComponent,
    ErrorPageComponent,
    SelectParticipantComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
