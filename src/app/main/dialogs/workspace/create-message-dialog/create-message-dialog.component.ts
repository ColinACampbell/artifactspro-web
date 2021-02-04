import { Component, OnInit, Inject, AfterViewInit, ElementRef } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { HttpResponse } from '@angular/common/http';
import { Artifact } from 'src/app/models/artifacts';
import { ViewChild } from '@angular/core';
import { MatOption } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSelectChange } from '@angular/material/select';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-create-message-dialog',
  templateUrl: './create-message-dialog.component.html',
  styleUrls: ['./create-message-dialog.component.css']
})
export class CreateMessageDialogComponent implements OnInit, AfterViewInit {


  public panelOpenState : Boolean;
  public artifacts : Artifact[];
  public artifactName : String = ""
  @ViewChild("selectedArtifacts", { static: true }) public selectedArtifacts: ElementRef;

  constructor(
    private dialogRef : MatDialogRef<CreateMessageDialogComponent>,
    private utilService : UtilService,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private workspaceService:WorkSpaceService,
    private socketService : SocketService
  ) { }

  ngOnInit() {
    this.workspaceService.getArtifacts(this.dialogData.workspaceID)
    this.workspaceService.artifactsObservable.subscribe((artifacts:Artifact[])=>{
      this.artifacts = artifacts;
    })
  }

  ngAfterViewInit(): void {
    
  }

  public postMessage(title:String,content:String)
  {
    
    const date = this.utilService.getCurrentDate();
    const workspaceID = this.dialogData.workspaceID;
    const time = new Date().getTime();

    this.workspaceService.postMessage(workspaceID,title,content,time,date,this.artifactName)
    .subscribe((response :HttpResponse<Object>)=>{
      if (response.status === 201)
        this.workspaceService.getMessages(workspaceID)
        this.dialogRef.close()
        this.socketService.socket.emit('start_discussion',this.dialogData.workspaceID)
    });

  }

  public closeDialog()
  {
    this.dialogRef.close();
  }

  public onArtifactSelected(event:MatSelectChange)
  {
    this.artifactName = (event.source.selected as MatOption).viewValue
  }

  public runTest(selectedArtifacts:any)
  {
    console.log(selectedArtifacts.selectedOptions.selected[0])
  }
}
