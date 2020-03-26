import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Organization } from 'src/app/models/organization';

@Component({
  selector: 'app-signup-action',
  templateUrl: './signup-action.component.html',
  styleUrls: ['./signup-action.component.css']
})
export class SignupActionComponent implements OnInit {

  constructor(private orgServ : OrganizationService, private snackBar: MatSnackBar, private router : Router) {
   
   }

   ngOnInit() {

  }

  public createOrganization(name,orgKey,orgPassKey)
  {
    this.orgServ.createOrganization(name,orgKey,orgPassKey)
    .then((data)=>{
      let message = data['message'];
      let organizationParams = data['organization']; // get information about the organization set in the request
      if (message === 'success')
      {
        console.log(organizationParams);
        let snackBarRef = this.snackBar.open("Creation Success","Next");

        /**
        let organization = new Organization(organizationParams)
        this.orgServ.setOrganization(organization)
        
        console.log(organization);
        console.log(organization.getName());
        **/
       
        snackBarRef.onAction().subscribe(()=>{
          this.router.navigate(['/app'])
        })

      }
      else {
        this.snackBar.open("It seems like the organization code already exists","Okay");
      }
    })
  }

}
