import { Component, OnInit, Inject, AfterViewInit, ElementRef } from '@angular/core';
import { MatDialogRef, MatOption, MatSelectChange, MAT_DIALOG_DATA } from '@angular/material';
import { UtilService } from 'src/app/services/util.service';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { ViewWorkSpaceComponent } from '../../components/work-space/view-work-space/view-work-space.component';
import { HttpResponse } from '@angular/common/http';
import { Artifact } from 'src/app/models/artifacts';
import { ViewChild } from '@angular/core';

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
