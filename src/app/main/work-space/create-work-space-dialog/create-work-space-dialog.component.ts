import { Component, OnInit } from '@angular/core';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { Router } from '@angular/router';
import { MatSnackBar, MatDialogRef } from '@angular/material';
import { UtilService } from 'src/app/services/util.service';

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

  public createWorkSpace(name:String)
  {
    let currentDate = this.utilService.getCurrentDate();

    this.workspaceService.createWorkSpace(name,currentDate)
    .subscribe((observable)=>{
      let message = observable['message'];
      if (message === 'ok')
      {
        let workspaceID = observable['work_space_id'];
        this.dialogRef.close();
        this.router.navigate([`/app/workspace/`,workspaceID])
      } else {
        // show error
        this.snackBar.open("Looks like something went wrong","Ok")
      }
      
    })
  }
}
