import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { Organization } from 'src/app/models/organization';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { NavigationService } from 'src/app/services/util/navigation.service';
import { Input } from '@angular/core';
import { User } from "./../../../models/user"
import { MatDialog } from '@angular/material/dialog';
import { UserInfoComponent } from '../user-info/user-info.component';
import { JWTService } from 'src/app/services/util/jwt.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {


  @Input("show-drawer-icon") public showDrawerIcon : Boolean = false;

  public organization : Organization
  public user: User;
  public fullName:string = '';

  constructor(
    private orgServe:OrganizationService,
    private userServ:UserService,
    private navigationService : NavigationService,
    private router: Router,
    private dialog : MatDialog,
    private jwtService : JWTService,
    ) { }

  ngOnInit() {
    this.getUser().subscribe((user)=>{
      this.user = user;
      this.fullName = `${this.user.first_name} ${this.user.last_name}`;
    })

  }

  private getUser() : Observable<User>
  {
    return this.userServ.getUserInfo();
  }


  public toggleDrawer()
  {
    this.navigationService.toggleMainNavDrawer()
  }
  
  public logOut()
  {
    this.jwtService.setToken('')
    this.router.navigate(['/login'])
  }

  public openUserInfoComponent()
  {
    this.dialog.open(UserInfoComponent,{
      width : "700px",
      height: "500px"
    })
  }

}
