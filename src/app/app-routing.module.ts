import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { SignupComponent } from './home/signup/signup.component';
import { LoginComponent } from './home/login/login.component';
import { SignupActionComponent } from './home/signup/signup-action/signup-action.component';
import { MainComponent } from './main/main/main.component';
import { ArtifactComponent } from './main/components/artifact/artifact.component';
import { NoaccessComponent } from './home/noaccess/noaccess.component';
import { VerifyUserComponent } from './main/components/verify-user/verify-user.component'
import { TeamInviteComponent } from './main/components/team/team-invite/team-invite.component';
import { ViewWorkSpaceComponent } from './main/components/work-space/view-work-space/view-work-space.component';
import { WorkSpaceMessageThreadComponent } from './main/components/work-space-message-thread/work-space-message-thread.component';


const routes: Routes = [
  { path : "", component: LandingPageComponent },
  { path : "signup", component : SignupComponent },
  { path : 'login', component : LoginComponent },
  { path : 'signup/action', component : SignupActionComponent },
  { path : 'error', component : NoaccessComponent },
  { path : 'account/verify/:id', component : VerifyUserComponent },
  { path : 'team/invite/:id', component: TeamInviteComponent},
  { path : 'app/workspace/:id', component : ViewWorkSpaceComponent },
  { path : 'app', component : MainComponent },
  { path : 'app/artifact/:id', component: ArtifactComponent },
  { path : 'app/workspace/:workspaceID/message/:messageID', component : WorkSpaceMessageThreadComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
