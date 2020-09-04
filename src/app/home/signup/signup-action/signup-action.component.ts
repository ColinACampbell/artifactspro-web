import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { Organization } from 'src/app/models/organization';
import { HttpResponse } from '@angular/common/http';

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
    .subscribe((response: HttpResponse<Object>)=>{
      
      let status = response.status;
      
      if (status === 201)
      {
      
        let snackBarRef = this.snackBar.open("Creation Success","Next");
        snackBarRef.onAction().subscribe(()=>{
          this.router.navigate(['/app'])
        })
      }
      else if (status == 409)
      {
        this.snackBar.open("It seems like the organization code already exists","Okay");
      }
    })
  }

}
