import { Component, OnInit } from '@angular/core';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';
import { HttpResponse } from '@angular/common/http';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-work-space-dialog',
  templateUrl: './create-work-space-dialog.component.html',
  styleUrls: ['./create-work-space-dialog.component.css']
})
export class CreateWorkSpaceDialogComponent implements OnInit {

  constructor(
    private workspaceService:WorkSpaceService,
    private router: Router,
    private snackBar:MatSnackBar,
    private utilService:UtilService,
    private dialogRef: MatDialogRef<CreateWorkSpaceDialogComponent>
  ) { }

  ngOnInit() {
  }

  public createWorkSpace(name:String, description:String)
  {
    let currentDate = this.utilService.getCurrentDate();

    this.workspaceService.createWorkSpace(name.trim(),description.trim(),currentDate,)
    .subscribe((response : HttpResponse<Object>)=>{

      console.log(response.body)
      let status = response.status;
      if (status === 201)
      {
        let workspaceID = response.body['workspaceID'];
        console.log(workspaceID)
        this.closeDialog()
        this.router.navigate([`/app/workspace/`,workspaceID])
        this.workspaceService.getWorkSpaces();
      } else {
        // show error
        this.snackBar.open("Looks like something went wrong","Ok")
      }
      
    })
  }

  public closeDialog()
  {
    this.dialogRef.close();
  }
}
