import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

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
      if (message === 'success')
      {
        let snackBarRef = this.snackBar.open("Sign Up Success","Next");
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
