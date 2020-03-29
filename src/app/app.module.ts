import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule,MatListModule, MatToolbarModule, MatInputModule, MatTooltipModule, MatSelectModule, MatSnackBarModule,MatFormFieldModule, MatTabsModule} from "@angular/material";
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
    MatListModule
  ],
  providers: [UserService,OrganizationService,ArtifactsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
