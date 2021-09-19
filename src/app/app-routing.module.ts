import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { SignupComponent } from './home/signup/signup.component';
import { LoginComponent } from './home/login/login.component';
import { SignupActionComponent } from './home/signup/signup-action/signup-action.component';
import { MainComponent } from './main/main/main.component';
import { ArtifactComponent } from './main/components/artifact/artifact.component';
import { NoaccessComponent } from './home/noaccess/noaccess.component';
import { VerifyUserComponent } from './main/components/user/verify-user/verify-user.component'
import { TeamInviteComponent } from './main/components/team/team-invite/team-invite.component';
import { ViewWorkSpaceComponent } from './main/components/work-space/view-work-space/view-work-space.component';
import { WorkSpaceMessageThreadComponent } from './main/components/work-space/work-space-message-thread/work-space-message-thread.component';
import { WorkSpaceComponent } from './main/components/work-space/work-space.component';
import { TeamComponent } from './main/components/team/team.component';
import { ArtifactsComponent } from './main/components/artifacts/artifacts.component';
import { RequestForgetPasswordComponent } from './main/components/user/user-forget-password/request-forget-password/request-forget-password.component';
import { RecoverPasswordComponent } from './main/components/user/user-forget-password/recover-password/recover-password.component';
import { WorkflowComponent } from './main/components/workflow/workflow.component';


const routes: Routes = [
  { path : '', component: LandingPageComponent },
  { path : 'signup', component : SignupComponent },
  { path : 'login', component : LoginComponent },
  { path : 'signup/action', component : SignupActionComponent },
  { path:  'action/forgot-password', component : RequestForgetPasswordComponent },
  { path:  'action/recovery/:code', component : RecoverPasswordComponent},
  { path : 'error', component : NoaccessComponent },
  { path : 'account/verify/:id', component : VerifyUserComponent },
  { path : 'team/invite/:id', component: TeamInviteComponent},
  { path : 'app/workspace/:id', component : ViewWorkSpaceComponent },
  { path : 'app', component : MainComponent, children : [
    { path :'', component : ArtifactsComponent},
    { path :'my-workspaces', component : WorkSpaceComponent},
    { path :'my-team', component : TeamComponent },
    { path : "my-workflows", component: WorkflowComponent}
  ]},
  { path : 'app/artifact/:id', component: ArtifactComponent },
  { path : 'app/workspace/:workspaceID/message/:messageID', component : WorkSpaceMessageThreadComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
