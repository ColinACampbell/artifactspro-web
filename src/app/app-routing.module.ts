import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { SignupComponent } from './home/signup/signup.component';
import { LoginComponent } from './home/login/login.component';
import { SignupActionComponent } from './home/signup/signup-action/signup-action.component';


const routes: Routes = [
  { path : "", component: LandingPageComponent },
  { path : "signup", component : SignupComponent },
  { path : 'login', component : LoginComponent },
  { path : 'signup/action', component : SignupActionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
