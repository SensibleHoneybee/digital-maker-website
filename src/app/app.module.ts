import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { CustomerScannerComponent } from './customer-scanner/customer-scanner.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CodingWindowComponent } from './coding-window/coding-window.component';
import { StartShoppingComponent } from './start-shopping/start-shopping.component';
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
    StartShoppingComponent,
    StartTillComponent,
    WriteCodeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
