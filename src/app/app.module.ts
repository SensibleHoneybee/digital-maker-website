import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CustomerScannerComponent } from './customer-scanner/customer-scanner.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CodingWindowComponent } from './coding-window/coding-window.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { StartTillComponent } from './start-till/start-till.component';
import { WriteCodeComponent } from './write-code/write-code.component';

@NgModule({
  declarations: [
    AppComponent,
    StartScreenComponent,
    HeaderComponent,
    FooterComponent,
    CustomerScannerComponent,
    CheckoutComponent,
    CodingWindowComponent,
    ShoppingComponent,
    StartTillComponent,
    WriteCodeComponent
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
