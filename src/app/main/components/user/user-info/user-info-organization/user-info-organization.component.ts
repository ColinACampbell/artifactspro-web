import { Component, Input, OnInit } from '@angular/core';
import { Organization } from 'src/app/models/organization';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-user-info-organization',
  templateUrl: './user-info-organization.component.html',
  styleUrls: ['./user-info-organization.component.css']
})
export class UserInfoOrganizationComponent implements OnInit {

  @Input('user') public user : User;
  @Input('organization') public organization: Organization
  
  constructor() { }

  ngOnInit(): void {
  }

}
