import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Organization } from 'src/app/models/organization';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup-action',
  templateUrl: './signup-action.component.html',
  styleUrls: ['./signup-action.component.css']
})
export class SignupActionComponent implements OnInit {

  constructor(private orgServ: OrganizationService, private snackBar: MatSnackBar, private router: Router, private _formBuilder: FormBuilder) {

  }

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  public createOrganization(name, orgKey, orgPassKey) {
    this.orgServ.createOrganization(name, orgKey, orgPassKey)
      .subscribe((response: HttpResponse<Object>) => {

        let status = response.status;

        if (status === 201) {

          let snackBarRef = this.snackBar.open("Creation Success", "Next");
          snackBarRef.onAction().subscribe(() => {
            this.router.navigate(['/app'])
          })
        }
        else if (status == 409) {
          this.snackBar.open("It seems like the organization code already exists", "Okay");
        }
      })
  }

}
