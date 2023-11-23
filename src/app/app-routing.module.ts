import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WriteCodeComponent } from './write-code/write-code.component';
import { MainWebsiteGuard } from './_helpers/main-website-guard';
import { InputOutputConsoleComponent } from './input-output-console/input-output-console.component';
import { CreateNewInstanceComponent } from './create-new-instance/create-new-instance.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { PlaySpotifyComponent } from './play-spotify/play-spotify.component';
import { LoginToSpotifyComponent } from './login-to-spotify/login-to-spotify.component';

const routes: Routes = [
  { path: 'error-page', component: ErrorPageComponent },
  { path: 'create-new-instance/:instanceid', component: CreateNewInstanceComponent, canActivate: [MainWebsiteGuard] },
  { path: 'input-output-console/:instanceid', component: InputOutputConsoleComponent, canActivate: [MainWebsiteGuard] },
  { path: 'write-code/:instanceid', component: WriteCodeComponent, canActivate: [MainWebsiteGuard] },
  { path: 'play-spotify', component: PlaySpotifyComponent },
  { path: 'login-to-spotify', component: LoginToSpotifyComponent },
  { path: '**', component: ErrorPageComponent }
  ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }