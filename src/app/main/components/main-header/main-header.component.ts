import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { Organization } from 'src/app/models/organization';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { NavigationService } from 'src/app/services/util/navigation.service';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  public organization : Organization = new Organization({});
  public user: User;
  public fullName:string = '';

  constructor(
    private orgServe:OrganizationService,
    private userServ:UserService,
    private navigationService : NavigationService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.getOrganization().then((data)=>
    {
      this.organization = new Organization(data);
    })

    this.getUser().subscribe((user)=>{
      this.user = user;
      this.fullName = `${this.user.first_name} ${this.user.last_name}`;
    })

    //const socket = io('http://localhost:3000');
    //socket.emit('foo',{helloworld:'Colin Campbell'})
  }

  private getOrganization() : Promise<any>
  {
    return this.orgServe.getOrganization();
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
    this.userServ.signOut()
    .subscribe((response : HttpResponse<Object>)=>{
      if (response.status == 200)
        this.router.navigate(['/login'])
    })
  }

}
