import { Component, Input, OnInit } from '@angular/core';
import { Artifact } from 'src/app/models/artifacts';
import { WorkSpace } from 'src/app/models/workspace';
import { WorkspaceArtifact } from 'src/app/models/workspaceArtifact';
import { WorkSpaceService } from 'src/app/services/work-space.service';

@Component({
  selector: 'app-wsdetail-artifacts',
  templateUrl: './wsdetail-artifacts.component.html',
  styleUrls: ['./wsdetail-artifacts.component.css']
})
export class WsdetailArtifactsComponent implements OnInit {

  @Input('workspace') private workspace : WorkSpace

  public artifacts : Artifact[];
  public showDetails : Boolean = false
  public selectedArtifact : Artifact = null
  public accessUsers : WorkspaceArtifactAccessUser[]
  public displayedColumns: string[] = ['Email', 'Permissions'];
  public workspaceArtifact : WorkspaceArtifact = null

  constructor(
    private workspaceService : WorkSpaceService
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
      console.log(workspaceArtifact)
      this.workspaceArtifact = workspaceArtifact
    })
  }
}
