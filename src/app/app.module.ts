import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatMenuModule } from '@angular/material/menu';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { FooterComponent } from './footer/footer.component';
import { InputOutputConsoleComponent } from './input-output-console/input-output-console.component';
import { WriteCodeComponent } from './write-code/write-code.component';
import { CreateNewInstanceComponent } from './create-new-instance/create-new-instance.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PlaySpotifyComponent } from './play-spotify/play-spotify.component';
import { LoginToSpotifyComponent } from './login-to-spotify/login-to-spotify.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    InputOutputConsoleComponent,
    WriteCodeComponent,
    CreateNewInstanceComponent,
    ErrorPageComponent,
    PlaySpotifyComponent,
    LoginToSpotifyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatMenuModule,
    MatTabsModule,
    MatIconModule,
    MatSidenavModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
