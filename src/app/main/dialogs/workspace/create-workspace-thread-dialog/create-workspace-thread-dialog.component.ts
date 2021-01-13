import { Component, OnInit, Inject } from '@angular/core';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { HttpResponse } from '@angular/common/http';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkSpacePost } from 'src/app/models/workspacePost';

@Component({
  selector: 'app-create-workspace-thread-dialog',
  templateUrl: './create-workspace-thread-dialog.component.html',
  styleUrls: ['./create-workspace-thread-dialog.component.css']
})
export class CreateWorkspaceThreadDialogComponent implements OnInit {

  constructor(
     @Inject(MAT_DIALOG_DATA) public workspacePost: WorkSpacePost,
     private workspaceService : WorkSpaceService,
     private snackBar : MatSnackBar,
     private dialogRef : MatDialogRef<CreateWorkspaceThreadDialogComponent>
  ) { }

  ngOnInit() {

  }

  public postMessageThread(content : String)
  {
    const timeStamp = new Date().getTime();
    this.workspaceService.postWorkspacePostReply(this.workspacePost.work_space_id,this.workspacePost.work_space_msg_id,content,"NONE",timeStamp)
    .subscribe(( response : HttpResponse<Object>)=>{
      if (response.status === 201 )
      {
        this.workspaceService.getWorkspacePostReplies(this.workspacePost.work_space_id,this.workspacePost.work_space_msg_id)
        this.closeDialog();
      }
    })
  }

  public closeDialog()
  {
    this.dialogRef.close();
  }

}
