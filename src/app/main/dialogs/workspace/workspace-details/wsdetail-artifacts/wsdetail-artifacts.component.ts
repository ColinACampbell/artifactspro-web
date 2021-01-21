import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Artifact } from 'src/app/models/artifacts';
import { WorkSpace } from 'src/app/models/workspace';
import { WorkspaceArtifact } from 'src/app/models/workspaceArtifact';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { WorkspaceParticipant } from "src/app/models/workspaceParticipant";
import { WorkspaceArtifactAccessUser } from "src/app/models/workspaceArtifactAccessUser"
import { AddPeopleToArtifactAccessDialogComponent } from '../../add-people-to-artifact-access-dialog/add-people-to-artifact-access-dialog.component';
import { HttpResponse } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-wsdetail-artifacts',
  templateUrl: './wsdetail-artifacts.component.html',
  styleUrls: ['./wsdetail-artifacts.component.css']
})
export class WsdetailArtifactsComponent implements OnInit {

  @Input('workspace') private workspace : WorkSpace
  @Input('workspaceParticipantAsUser') public workspaceParticipantAsUser : WorkspaceParticipant

  public artifacts : Artifact[];
  public showDetails : Boolean = false
  public selectedArtifact : Artifact = null
  public accessUsers : WorkspaceArtifactAccessUser[]
  public displayedColumns: string[] = ['Email', 'Permissions'];
  public workspaceArtifact : WorkspaceArtifact = null

  constructor(
    private workspaceService : WorkSpaceService,
    private dialog : MatDialog,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.getArtifacts()
  }

  private getArtifacts()
  {
    this.workspaceService.artifactsObservable
    .subscribe((artifacts : Artifact[])=>{
      this.artifacts = artifacts
    })
  }

  public viewInfo(artifact : Artifact)
  { 
    this.showDetails = true
    this.selectedArtifact = artifact
    this.getAccessUsersFromSelectedArtifact(this.workspace.work_space_id,this.selectedArtifact.art_id)
    // Get detailed info about artifact as it pertains to the workspace
    this.getArtifactAsWorkspaceArtifact(this.workspace.work_space_id,this.selectedArtifact.art_id)
  }

  public getAccessUsersFromSelectedArtifact(workspaceID: number,artifactID : number)
  {
    this.workspaceService.getWorkspaceArtifactAccessUsers(workspaceID,artifactID)
    this.workspaceService.workspaceArtifactAccessUsersObservable
    .subscribe((accessUsers : WorkspaceArtifactAccessUser[])=>{
      this.accessUsers = accessUsers
    })
  }

  public getArtifactAsWorkspaceArtifact(workspaceID : number, artifactID : number)
  {
    this.workspaceService.getWorkspaceArtifact(workspaceID,artifactID)
    .subscribe((workspaceArtifact : WorkspaceArtifact)=>{
      this.workspaceArtifact = workspaceArtifact
    })
  }

  public openManageUserDialog()
  {
    this.dialog.open(AddPeopleToArtifactAccessDialogComponent,{
      data : {
        workspaceID : this.workspace.work_space_id,
        workspaceArtifactID: this.workspaceArtifact.work_space_artifacts_id,
        reference : "wsdetail-artifacts-component",
        accessUsers : this.accessUsers
      },
      width : "400px",
      height : "400px"
    })
  }


  public updateShownDetails()
  {
    this.getAccessUsersFromSelectedArtifact(this.workspace.work_space_id,this.selectedArtifact.art_id)
    // Get detailed info about artifact as it pertains to the workspace
    this.getArtifactAsWorkspaceArtifact(this.workspace.work_space_id,this.selectedArtifact.art_id)
  }

  public togglePasswordProtection()
  {
    this.workspaceService.toggleWorkspaceArtifactSecurity(this.workspaceArtifact.is_secured !== 1,this.workspaceArtifact.work_space_artifacts_id)
    .subscribe((response : HttpResponse<Object>)=>{
      if(response.status === 200)
      {
       this.snackBar.open(`Password Protection Was Tured ${this.workspaceArtifact.is_secured !== 1 ? "On" : "Off"}`,"Okay")
        this.updateShownDetails()
      }

    })
  }
}
