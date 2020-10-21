import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatDatepickerModule, MatNativeDateModule, MatCardModule, MatProgressBarModule, MatTableModule, MatProgressSpinnerModule, MatPaginatorModule } from '@angular/material';
import { MatButtonModule, MatTreeModule,
  MatListModule, MatGridListModule, MatDialogModule, 
  MatToolbarModule, MatInputModule, MatTooltipModule, 
  MatSelectModule, MatSnackBarModule, 
  MatFormFieldModule, MatTabsModule,MatAutocompleteModule } from "@angular/material";
  import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion'; 
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './home/header/header.component';
import { HttpClientModule } from '@angular/common/http';
import { UserService } from './services/user.service';
import { SignupActionComponent } from './home/signup/signup-action/signup-action.component';
import { MainComponent } from './main/main/main.component';
import { MainHeaderComponent } from './main/components/main-header/main-header.component';
import { OrganizationService } from './services/organization.service';
import { ArtifactsComponent } from './main/components/artifacts/artifacts.component';
import { ArtifactsService } from './services/artifacts.service';
import { CreateDialogComponent } from './main/dialogs/create-artifact-dialog/create-dialog.component';
import { ArtifactComponent } from "./main/components/artifact/artifact.component"
import { DocumentService } from './services/document.service';
import { UploadDialogComponent } from './main/dialogs/upload-artifact-dialog/upload-dialog.component';
import { Environment } from './models/environment';
import { NoaccessComponent } from './home/noaccess/noaccess.component';
import { TeamComponent } from './main/components/team/team.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer'
import { MemberService } from './services/member.service';
import { VerifyUserComponent } from './main/components/verify-user/verify-user.component';
import { DeleteArtifactDialogComponent } from './main/dialogs/delete-artifact-dialog/delete-artifact-dialog.component';
import { InviteDialogComponent } from './main/dialogs/team-invite-dialog/invite-dialog.component';
import { TeamInviteComponent } from './main/components/team/team-invite/team-invite.component';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { WorkSpaceComponent } from './main/components/work-space/work-space.component';
import { WorkSpaceService } from './services/work-space.service';
import { CreateWorkSpaceDialogComponent } from './main/dialogs/create-work-space-dialog/create-work-space-dialog.component';
import { ViewWorkSpaceComponent } from './main/components/work-space/view-work-space/view-work-space.component';
import { UtilService } from './services/util.service';
import { WorkSpaceInfoPanelComponent } from './main/components/work-space/work-space-info-panel/work-space-info-panel.component';
import { WorkSpaceAddMemberComponent } from './main/dialogs/work-space-add-member-dialog/work-space-add-member.component';
import { MessageCardComponent } from './main/components/work-space/message-card/message-card.component';
import { CreateMessageDialogComponent } from './main/dialogs/create-message-dialog/create-message-dialog.component';
import { AddArtifactDialogComponent } from './main/dialogs/add-artifact-dialog/add-artifact-dialog.component';
import { WorkSpaceMessageThreadComponent } from './main/components/work-space-message-thread/work-space-message-thread.component';
import { WorkSpaceMessageThreadReplyCardComponent } from './main/components/work-space-message-thread/work-space-message-thread-reply-card/work-space-message-thread-reply-card.component';
import { CreateWorkspaceThreadDialogComponent } from './main/dialogs/create-workspace-thread-dialog/create-workspace-thread-dialog.component';
import { ChatComponent } from './main/components/chat/chat.component';
import { ChatService } from './services/chat.service';
import { ChatRoomsComponent } from './main/components/chat/chat-rooms/chat-rooms.component';
import { ChatContactsDialogComponent } from "./main/dialogs/chat-contacts-dialog/chat-contacts-dialog.component";
import { ChangeUserPermissionsDialogComponent } from './main/dialogs/change-user-permissions-dialog/change-user-permissions-dialog.component';
import { WorkpaceDetailsComponent } from './main/dialogs/workspace/workpace-details/workpace-details.component';

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
    WorkSpaceInfoPanelComponent,
    WorkSpaceAddMemberComponent,
    MessageCardComponent,
    CreateMessageDialogComponent,
    AddArtifactDialogComponent,
    WorkSpaceMessageThreadComponent,
    WorkSpaceMessageThreadReplyCardComponent,
    CreateWorkspaceThreadDialogComponent,
    ChatComponent,
    ChatRoomsComponent,
    ChatContactsDialogComponent,
    ChangeUserPermissionsDialogComponent,
    WorkpaceDetailsComponent,
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
    MatTreeModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    NgxExtendedPdfViewerModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatChipsModule
  ],
  entryComponents: [ // provide vital information to create dialog at run time
    AddArtifactDialogComponent,
    CreateDialogComponent,
    UploadDialogComponent,
    DeleteArtifactDialogComponent,
    InviteDialogComponent,
    CreateWorkSpaceDialogComponent,
    WorkSpaceAddMemberComponent,
    CreateMessageDialogComponent,
    CreateWorkspaceThreadDialogComponent,
    ChatContactsDialogComponent,
    ChangeUserPermissionsDialogComponent
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
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
