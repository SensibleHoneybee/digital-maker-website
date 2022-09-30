import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StartScreenComponent } from './start-screen/start-screen.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { StartTillComponent } from './start-till/start-till.component';
import { WriteCodeComponent } from './write-code/write-code.component';
import { MainWebsiteGuard } from './_helpers/main-website-guard';

const routes: Routes = [
  { path: '', component: StartScreenComponent, canActivate: [MainWebsiteGuard] },
  { path: 'start-screen', component: StartScreenComponent },
  { path: 'start-shopping', component: ShoppingComponent },
  { path: 'start-till', component: StartTillComponent },
  { path: 'write-code', component: WriteCodeComponent }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }