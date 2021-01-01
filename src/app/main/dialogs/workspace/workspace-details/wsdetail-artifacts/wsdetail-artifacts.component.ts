import { Component, Input, OnInit } from '@angular/core';
import { Artifact } from 'src/app/models/artifacts';
import { WorkSpace } from 'src/app/models/workspace';
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
  }

}
