import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule, MatNativeDateModule, MatCardModule, MatProgressBarModule, MatTableModule } from '@angular/material';
import { MatButtonModule, MatTreeModule,
  MatListModule, MatGridListModule, MatDialogModule, 
  MatToolbarModule, MatInputModule, MatTooltipModule, 
  MatSelectModule, MatSnackBarModule, 
  MatFormFieldModule, MatTabsModule } from "@angular/material";
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './home/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { SignupActionComponent } from './home/signup/signup-action/signup-action.component';
import { MainComponent } from './main/main/main.component';
import { MainHeaderComponent } from './main/main-header/main-header.component';
import { OrganizationService } from './services/organization.service';
import { ArtifactsComponent } from './main/artifacts/artifacts.component';
import { ArtifactsService } from './services/artifacts.service';
import { CreateDialogComponent } from './main/artifacts/create-dialog/create-dialog.component';
import {ArtifactComponent} from "./main/artifacts/artifact/artifact.component"
import { DocumentService } from './services/document.service';
import { UploadDialogComponent } from './main/artifacts/artifact/upload-dialog/upload-dialog.component';
import { Environment } from './models/environment';
import { NoaccessComponent } from './home/noaccess/noaccess.component';
import { TeamComponent } from './main/team/team.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer'
import { MemberService } from './services/member.service';
import { VerifyUserComponent } from './main/verify-user/verify-user.component';
import { DeleteArtifactDialogComponent } from './main/artifacts/artifact/delete-artifact-dialog/delete-artifact-dialog.component';
import { InviteDialogComponent } from './main/team/invite-dialog/invite-dialog.component';
import { TeamInviteComponent } from './main/team/team-invite/team-invite.component';
import { FormsModule } from '@angular/forms';
import { WorkSpaceComponent } from './main/work-space/work-space.component';
import { WorkSpaceService } from './services/work-space.service';
import { CreateWorkSpaceDialogComponent } from './main/work-space/create-work-space-dialog/create-work-space-dialog.component';
import { ViewWorkSpaceComponent } from './main/work-space/view-work-space/view-work-space.component';
import { UtilService } from './services/util.service';
import { WorkSpaceMembersComponent } from './main/work-space/work-space-members/work-space-members.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    LoginComponent,
    SignupComponent,
    HeaderComponent,
    SignupActionComponent,
    MainComponent,
    MainHeaderComponent,
    ArtifactsComponent,
    CreateDialogComponent,
    ArtifactComponent,
    UploadDialogComponent,
    NoaccessComponent,
    TeamComponent,
    VerifyUserComponent,
    DeleteArtifactDialogComponent,
    InviteDialogComponent,
    TeamInviteComponent,
    WorkSpaceComponent,
    CreateWorkSpaceDialogComponent,
    ViewWorkSpaceComponent,
    WorkSpaceMembersComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatMenuModule,
    MatIconModule,
    MatToolbarModule,
    MatInputModule,
    MatTooltipModule,
    MatFormFieldModule,
    HttpClientModule,
    MatTabsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatListModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatProgressBarModule,
    MatTableModule,
    NgxDocViewerModule,
    MatGridListModule,
    MatTreeModule
  ],
  entryComponents: [ // provide vital information to create dialog at run time
    CreateDialogComponent,
    UploadDialogComponent,
    DeleteArtifactDialogComponent,
    InviteDialogComponent,
    CreateWorkSpaceDialogComponent
  ],
  providers: [
    UserService, 
    OrganizationService, 
    ArtifactsService,
    DocumentService,
    Environment,
    MemberService,
    WorkSpaceService,
    UtilService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
