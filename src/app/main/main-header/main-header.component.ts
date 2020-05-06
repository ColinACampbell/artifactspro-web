import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { Organization } from 'src/app/models/organization';
import { UserService } from 'src/app/services/user.service';
import { Observable } from 'rxjs';
import io from 'socket.io-client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  public organization : Organization = new Organization({});
  public user: User;
  public fullName:String = '';

  constructor(
    private orgServe:OrganizationService,
    private userServ:UserService,
    private router: Router
    ) { }

  ngOnInit() {
    this.getOrganization().then((data)=>
    {
      this.organization = new Organization(data);
    })

    this.getUser().subscribe((user)=>{
      this.user = user;
      this.fullName = `${this.user.first_name} ${this.user.last_name}`;
      console.log(this.fullName)
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

  public logOut()
  {
    this.userServ.signOut()
    .subscribe(observer=>{
      if (observer['message'] === 'ok')
        this.router.navigate(['/login'])
    })
  }

}
