import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { SignupComponent } from './home/signup/signup.component';


const routes: Routes = [
  { path : "", component: LandingPageComponent },
  { path : "signup", component : SignupComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
