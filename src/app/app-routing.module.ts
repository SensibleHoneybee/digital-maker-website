import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WriteCodeComponent } from './write-code/write-code.component';
import { MainWebsiteGuard } from './_helpers/main-website-guard';
import { CheckoutComponent } from './checkout/checkout.component';
import { LoginMeetingAdminComponent } from './login-meeting-admin/login-meeting-admin.component';
import { LoginMeetingComponent } from './login-meeting/login-meeting.component';
import { CustomerScannerComponent } from './customer-scanner/customer-scanner.component';
import { MeetingAdminComponent } from './meeting-admin/meeting-admin.component';
import { CreateMeetingComponent } from './create-meeting/create-meeting.component';
import { LoginParticipantExistingComponent } from './login-participant-existing/login-participant-existing.component';
import { LoginParticipantNewComponent } from './login-participant-new/login-participant-new.component';
import { LoginParticipantStartScreenComponent } from './login-participant-start-screen/login-participant-start-screen.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { SelectParticipantComponent } from './select-participant/select-participant.component';

const routes: Routes = [
  { path: '', component: WriteCodeComponent, canActivate: [MainWebsiteGuard] },
  { path: 'error-page', component: ErrorPageComponent },
  { path: 'login-meeting/:id', component: LoginMeetingComponent },
  { path: 'login-participant-start-screen', component: LoginParticipantStartScreenComponent },
  { path: 'login-participant-new', component: LoginParticipantNewComponent },
  { path: 'login-participant-existing', component: LoginParticipantExistingComponent },
  { path: 'login-meeting-admin', component: LoginMeetingAdminComponent },
  { path: 'select-participant', component: SelectParticipantComponent },
  { path: 'customer-scanner', component: CustomerScannerComponent },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'write-code', component: WriteCodeComponent },
  { path: 'create-meeting', component: CreateMeetingComponent },
  { path: 'meeting-admin', component: MeetingAdminComponent },
  { path: 'meeting-admin/:id', component: MeetingAdminComponent },
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }