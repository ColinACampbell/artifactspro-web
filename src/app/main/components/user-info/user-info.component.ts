import { Component, OnInit } from '@angular/core';
import { timeStamp } from 'console';
import { Organization } from 'src/app/models/organization';
import { User } from 'src/app/models/user';
import { OrganizationService } from 'src/app/services/organization.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  public user: User;
  public organization: Organization;

  constructor(
    private userService : UserService,
    private orgService : OrganizationService
  ) { }

  ngOnInit(): void {
    this.userService.getUserInfo()
    .subscribe((user:User)=>{
      this.user = user
    })

    this.orgService.getOrganization()
    .subscribe((organization : Organization)=>{
      this.organization = organization
    })
  }

}
