import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { WorkSpaceService } from 'src/app/services/work-space.service';

@Component({
  selector: 'app-confirm-delete-workspace',
  templateUrl: './confirm-delete-workspace.component.html',
  styleUrls: ['./confirm-delete-workspace.component.css']
})
export class ConfirmDeleteWorkspaceComponent implements OnInit {


  public isNameCorrect : Boolean = false;
  constructor(
    private matDialogRef : MatDialogRef<ConfirmDeleteWorkspaceComponent>,
    private workspaceService : WorkSpaceService,
    @Inject(MAT_DIALOG_DATA)  private dialogData: any,
    private snackBar : MatSnackBar,
    private router : Router
  ) { }

  ngOnInit(): void {
  }


  onKeyUp(workspaceName : string)
  {
    if (this.dialogData.workspaceName === workspaceName) 
      this.isNameCorrect = true
  }


  deleteWorkspace()
  {
    this.workspaceService.deleteWorkspace(this.dialogData.workspaceID)
    .subscribe((response : HttpResponse<Object>)=>{
      console.log(response.status);
      if(response.status === 200)
      {
        let snackBarRef = this.snackBar.open("Workspace Was Deleted Successfully. Please exit this workspace","Okay");
        snackBarRef.afterDismissed()
        .subscribe(()=>{
          this.closeDialog()
          //this.router.navigate(['/app/my-workspaces'])
        })
      }
    })

  }

  closeDialog()
  {
    this.matDialogRef.close();
  }


}
