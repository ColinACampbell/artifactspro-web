import { Component, OnInit } from '@angular/core';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { HttpResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { OrganizationService } from 'src/app/services/organization.service';
import { Organization } from 'src/app/models/organization';
import { BillingService } from 'src/app/services/billing.service';

@Component({
  selector: 'app-create-work-space-dialog',
  templateUrl: './create-work-space-dialog.component.html',
  styleUrls: ['./create-work-space-dialog.component.css']
})
export class CreateWorkSpaceDialogComponent implements OnInit {

  constructor(
    private workspaceService: WorkSpaceService,
    private router: Router,
    private snackBar: MatSnackBar,
    private utilService: UtilService,
    private dialogRef: MatDialogRef<CreateWorkSpaceDialogComponent>,
    private orgService: OrganizationService,
    private billingService: BillingService
  ) { }

  ngOnInit() {
  }

  public createWorkSpace(name: String, description: String) {
    let currentDate = this.utilService.getCurrentDate();

    this.orgService.getOrganization()
      .subscribe((organization: Organization) => {

        const orgID = organization.org_id;
        this.billingService.verifyWorkspaceCapacity(orgID)
          .subscribe((response: HttpResponse<Object>) => {
            console.log(response)
            if (response.status === 200) {
              // Go on to create the workspace
              this.workspaceService.createWorkSpace(name.trim(), description.trim(), currentDate,)
                .subscribe((response: HttpResponse<Object>) => {

                  let status = response.status;
                  if (status === 201) {
                    let workspaceID = response.body['workspaceID'];
                    this.closeDialog()
                    this.router.navigate([`/app/workspace/`, workspaceID])
                    this.workspaceService.getWorkSpaces();
                  } else {
                    // show error
                    this.snackBar.open("Looks like something went wrong", "Ok")
                  }

                })
            }

          },(error)=>{
            // if they can't
            if (error['status'] === 401)
            {
              const ref = this.snackBar.open("Please upgrade your account to add more workspaces to this organization","Okay")
              ref.onAction()
              .subscribe((_)=>{
                this.dialogRef.close()
              })
            } 
            
          })
      })


  }

  public closeDialog() {
    this.dialogRef.close();
  }
}
