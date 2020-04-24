import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { SignupComponent } from './home/signup/signup.component';
import { LoginComponent } from './home/login/login.component';
import { SignupActionComponent } from './home/signup/signup-action/signup-action.component';
import { MainComponent } from './main/main/main.component';
import { ArtifactComponent } from './main/artifacts/artifact/artifact.component';
import { NoaccessComponent } from './home/noaccess/noaccess.component';
import { VerifyUserComponent } from './main/verify-user/verify-user.component'


const routes: Routes = [
  { path : "", component: LandingPageComponent },
  { path : "signup", component : SignupComponent },
  { path : 'login', component : LoginComponent },
  { path : 'signup/action', component : SignupActionComponent },
  { path : 'app', component : MainComponent },
  { path : 'app/artifact/:id', component: ArtifactComponent },
  { path : 'error', component : NoaccessComponent },
  { path : 'user/verify/:id', component : VerifyUserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
