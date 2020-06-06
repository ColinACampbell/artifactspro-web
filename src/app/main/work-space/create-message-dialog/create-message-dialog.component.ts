import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UtilService } from 'src/app/services/util.service';
import { WorkSpaceService } from 'src/app/services/work-space.service';

@Component({
  selector: 'app-create-message-dialog',
  templateUrl: './create-message-dialog.component.html',
  styleUrls: ['./create-message-dialog.component.css']
})
export class CreateMessageDialogComponent implements OnInit {

  constructor(
    private matDialog : MatDialogRef<CreateMessageDialogComponent>,
    private utilService : UtilService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private workspaceServ:WorkSpaceService
  ) { }

  ngOnInit() {
  }

  public postMessage(title:String,content:String)
  {
    
    const date = this.utilService.getCurrentDate();
    const workspaceID = this.dialogData.workspaceID;
    const time = new Date().getTime();

    this.workspaceServ.postMessage(workspaceID,title,content,time,date)
    .subscribe((observer)=>{
      console.log(observer.status)
    });

  }


  public closeDialog()
  {
    this.matDialog.close();
  }
}
