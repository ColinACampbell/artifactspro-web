import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BillingService } from 'src/app/services/billing.service';
import PricePackage from 'src/app/models/pricePackage';
import { MatCarousel, MatCarouselComponent } from '@ngbmodule/material-carousel';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-signup-action',
  templateUrl: './signup-action.component.html',
  styleUrls: ['./signup-action.component.css']
})
export class SignupActionComponent implements OnInit {

  constructor(
    private orgServ: OrganizationService, 
    private snackBar: MatSnackBar, 
    private router: Router, 
    private _formBuilder: FormBuilder,
    private billingService : BillingService
    ) {

  }

  isLinear = true;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  public pricePackages : PricePackage[];
  public selectedPackage : PricePackage

  ngOnInit() {

    this.getPricePackages();

    this.firstFormGroup = this._formBuilder.group({
      name: ['', Validators.required],
      phoneNumberInput1 : ['',[Validators.required, Validators.pattern('[0-9 ]{11}')]],
      phoneNumberInput2 : ['',[Validators.required, Validators.pattern('[0-9 ]{11}')]],
      addressInput1 : ['',[Validators.required]],
      addressInput2 : ['',[Validators.required]]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  private getPricePackages()
  {
    this.billingService.getPricePackages()
    .subscribe((packages : PricePackage[]) =>{
      this.pricePackages = packages.reverse();
    })
  }


  public selectPackage(plan: PricePackage, stepper : MatStepper)
  {
    this.selectedPackage = plan
    stepper.next();
  }



  public createOrganization(name:string,phone1:string,phone2:string,address1:string,address2:string) {
    this.orgServ.createOrganization(name, phone1,phone2,address1,address2,this.selectedPackage.package_id)
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

  get phoneNumberInput1() {
    return this.firstFormGroup.get('phoneNumberInput1')
  }

  get phoneNumberInput2()
  {
    return this.firstFormGroup.get('phoneNumberInput2')
  }

  get nameInput()
  {
    return this.firstFormGroup.get('name')
  }

  get addressInput1()
  {
    return this.firstFormGroup.get('addressInput1')
  }

  get addressInput2()
  {
    return this.firstFormGroup.get('addressInput2')
  }

}
