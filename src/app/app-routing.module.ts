import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { MainWebsiteGuard } from './_helpers/main-website-guard';

const routes: Routes = [
  { path: '', component: StartScreenComponent, canActivate: [MainWebsiteGuard] },
  { path: 'start-screen', component: StartScreenComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }