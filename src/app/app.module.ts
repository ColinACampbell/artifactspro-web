import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { NgxExtendedPdfViewerModule } from "ngx-extended-pdf-viewer"
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressSpinnerModule, } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from "@angular/material/datepicker"
import { MatNativeDateModule } from "@angular/material/core"
import { MatCardModule } from "@angular/material/card"
import { MatProgressBarModule } from "@angular/material/progress-bar"
import { MatTableModule } from "@angular/material/table"
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from '@angular/material/button';
import {MatStepperModule} from '@angular/material/stepper';
import { MatTreeModule } from '@angular/material/tree';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatDialogModule } from '@angular/material/dialog';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRippleModule } from '@angular/material/core'; 
import { MatChipsModule } from '@angular/material/chips';
import { MatSlideToggleModule } from "@angular/material/slide-toggle"
import { MatExpansionModule } from '@angular/material/expansion';
import { LandingPageComponent } from './home/landing-page/landing-page.component';
import { LoginComponent } from './home/login/login.component';
import { SignupComponent } from './home/signup/signup.component';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from './home/header/header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { UserService } from './services/user.service';
import { SignupActionComponent } from './home/signup/signup-action/signup-action.component';
import { MainComponent } from './main/main/main.component';
import { MainHeaderComponent } from './main/components/main-header/main-header.component';
import { OrganizationService } from './services/organization.service';
import { ArtifactsComponent } from './main/components/artifacts/artifacts.component';
import { ArtifactsService } from './services/artifacts.service';
import { ArtifactComponent } from "./main/components/artifact/artifact.component"
import { DocumentService } from './services/document.service';
import { Environment } from './models/environment';
import { NoaccessComponent } from './home/noaccess/noaccess.component';
import { TeamComponent } from './main/components/team/team.component';
import { NgxDocViewerModule } from 'ngx-doc-viewer'
import { MemberService } from './services/member.service';
import { VerifyUserComponent } from './main/components/user/verify-user/verify-user.component';
import { TeamInviteComponent } from './main/components/team/team-invite/team-invite.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkSpaceComponent } from './main/components/work-space/work-space.component';
import { WorkSpaceService } from './services/work-space.service';
import { ViewWorkSpaceComponent } from './main/components/work-space/view-work-space/view-work-space.component';
import { UtilService } from './services/util.service';
import { WorkSpaceInfoPanelComponent } from './main/components/work-space/work-space-info-panel/work-space-info-panel.component';
import { MessageCardComponent } from './main/components/work-space/message-card/message-card.component';

import { ChatComponent } from './main/components/chat/chat.component';
import { ChatService } from './services/chat.service';
import { ChatRoomsComponent } from './main/components/chat/chat-rooms/chat-rooms.component';
import { WorkpaceDetailsComponent } from './main/dialogs/workspace/workspace-details/workpace-details.component'
import { WorkSpaceMessageThreadReplyCardComponent } from './main/components/work-space/work-space-message-thread/work-space-message-thread-reply-card/work-space-message-thread-reply-card.component';
import { WorkSpaceMessageThreadComponent } from './main/components/work-space/work-space-message-thread/work-space-message-thread.component';
import { CreateDialogComponent } from './main/dialogs/artifacts/create-artifact-dialog/create-dialog.component';
import { DeleteArtifactDialogComponent } from './main/dialogs/artifacts/delete-artifact-dialog/delete-artifact-dialog.component';
import { UploadDialogComponent } from './main/dialogs/artifacts/upload-artifact-dialog/upload-dialog.component';
import { ChatContactsDialogComponent } from './main/dialogs/chat/chat-contacts-dialog/chat-contacts-dialog.component';
import { ChangeUserPermissionsDialogComponent } from './main/dialogs/team/change-user-permissions-dialog/change-user-permissions-dialog.component';
import { InviteDialogComponent } from './main/dialogs/team/team-invite-dialog/invite-dialog.component';
import { AddArtifactDialogComponent } from './main/dialogs/workspace/add-artifact-dialog/add-artifact-dialog.component';
import { CreateMessageDialogComponent } from './main/dialogs/workspace/create-message-dialog/create-message-dialog.component';
import { CreateWorkSpaceDialogComponent } from './main/dialogs/workspace/create-work-space-dialog/create-work-space-dialog.component';
import { CreateWorkspaceThreadDialogComponent } from './main/dialogs/workspace/create-workspace-thread-dialog/create-workspace-thread-dialog.component';
import { WorkSpaceAddMemberComponent } from './main/dialogs/workspace/work-space-add-member-dialog/work-space-add-member.component';
import { WsdetailOverviewComponent } from './main/dialogs/workspace/workspace-details/wsdetail-overview/wsdetail-overview.component';
import { WsdetailParticipantsComponent } from './main/dialogs/workspace/workspace-details/wsdetail-participants/wsdetail-participants.component';
import { WsdetailParticipantsActionDialogComponent } from './main/dialogs/workspace/workspace-details/wsdetail-participants/wsdetail-participants-action-dialog/wsdetail-participants-action-dialog.component';
import { AddPeopleToArtifactAccessDialogComponent } from './main/dialogs/workspace/add-people-to-artifact-access-dialog/add-people-to-artifact-access-dialog.component';
import { WorkspaceManagerService } from './services/util/workspace-manager.service';
import { ArtifactAuthorizationComponent } from './main/components/artifact/artifact-authorization/artifact-authorization.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { NavigationService } from './services/util/navigation.service';
import { ArtifactManagerService } from "./services/util/artifact-manager.service";
import { WsdetailArtifactsComponent } from './main/dialogs/workspace/workspace-details/wsdetail-artifacts/wsdetail-artifacts.component';
import { ConfirmDeleteWorkspaceComponent } from './main/dialogs/workspace/workspace-details/wsdetail-overview/confirm-delete-workspace/confirm-delete-workspace.component';
import { DocumentSearchComponent } from './main/components/artifact/document-search/document-search.component';
import { ShowArtifactInfoDialogComponent } from './main/dialogs/artifacts/show-artifact-info-dialog/show-artifact-info-dialog.component'
import { MatCarouselModule } from '@ngbmodule/material-carousel';
import { UserInfoComponent } from './main/components/user/user-info/user-info.component';

import { JWTInterceptor } from "./interceptors/jwt.interceptor"
import { EmailService } from './services/email.service';
import { UserInfoPersonalComponent } from './main/components/user/user-info/user-info-personal/user-info-personal.component';
import { UserInfoOrganizationComponent } from './main/components/user/user-info/user-info-organization/user-info-organization.component';
import { RequestForgetPasswordComponent } from './main/components/user/user-forget-password/request-forget-password/request-forget-password.component';

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
    WsdetailOverviewComponent,
    WorkpaceDetailsComponent,
    WsdetailOverviewComponent,
    WsdetailParticipantsComponent,
    WsdetailParticipantsActionDialogComponent,
    AddPeopleToArtifactAccessDialogComponent,
    ArtifactAuthorizationComponent,
    WsdetailArtifactsComponent,
    ConfirmDeleteWorkspaceComponent,
    DocumentSearchComponent,
    ShowArtifactInfoDialogComponent,
    UserInfoComponent,
    UserInfoPersonalComponent,
    UserInfoOrganizationComponent,
    RequestForgetPasswordComponent,

  ],
  imports: [
    MatCarouselModule.forRoot(),
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
    MatChipsModule,
    FormsModule,
    MatCheckboxModule,
    MatSidenavModule,
    MatRippleModule,
    MatSlideToggleModule,
    MatStepperModule
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
    ChangeUserPermissionsDialogComponent,
    WorkpaceDetailsComponent,
    WsdetailParticipantsActionDialogComponent,
    AddPeopleToArtifactAccessDialogComponent,
    ConfirmDeleteWorkspaceComponent,
    DocumentSearchComponent,
    ShowArtifactInfoDialogComponent
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
    ChatService,
    WorkspaceManagerService,
    NavigationService,
    ArtifactManagerService,
    EmailService,
    { provide: HTTP_INTERCEPTORS, useClass: JWTInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})

export class AppModule { }
