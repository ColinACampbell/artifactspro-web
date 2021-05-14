import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Organization } from 'src/app/models/organization';
import { User } from 'src/app/models/user';
import { OrganizationService } from 'src/app/services/organization.service';

@Component({
  selector: 'app-user-info-organization',
  templateUrl: './user-info-organization.component.html',
  styleUrls: ['./user-info-organization.component.css']
})
export class UserInfoOrganizationComponent implements OnInit {

  @Input('user') public user : User;
  @Input('organization') public organization: Organization
  public isEditable : boolean = false;

  constructor(
    private organizationService:OrganizationService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    
  }

  public saveChanges()
  {
    this.organizationService.changeOrgInfo(this.organization.name,this.organization.phone_line_1,
      this.organization.phone_line_2,this.organization.address_line_1,this.organization.address_line_2,this.organization.org_id)
      .subscribe((response:HttpResponse<Object>)=>{
        const okayStatus = 200
        if (response.status == okayStatus)
        {
          this.snackBar.open("Infomation Updated","Okay")
          this.isEditable = false;
        }
      },(error)=>{
        this.snackBar.open("Whoops, looks like something went wrong","Okay")
      })
  }

  public makeFieldsEditable()
  {
    this.isEditable = !this.isEditable;
  }

  public cancelEdit()
  {
    this.isEditable = !this.isEditable;
  }
}
