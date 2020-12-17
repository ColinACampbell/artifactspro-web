import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { Artifact } from 'src/app/models/artifacts';
import { WorkSpace } from 'src/app/models/workspace';
import { MatDialog } from '@angular/material/dialog';
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import { AddArtifactDialogComponent } from 'src/app/main/dialogs/workspace/add-artifact-dialog/add-artifact-dialog.component';
import { WorkSpaceAddMemberComponent } from 'src/app/main/dialogs/workspace/work-space-add-member-dialog/work-space-add-member.component';

@Component({
  selector: 'app-work-space-info-panel',
  templateUrl: './work-space-info-panel.component.html',
  styleUrls: ['./work-space-info-panel.component.css']
})
export class WorkSpaceInfoPanelComponent implements OnInit {
  public workspace : WorkSpace;
  public workspaceMembers:any[];
  public artifacts: Artifact[];
  public userAsWorkspaceParticipant : WorkspaceParticipant;

  constructor(
    private workspaceService:WorkSpaceService,
    private dialog: MatDialog,
  ) { }

  ngOnInit() {

    this.workspaceService.principalWorkspaceObservable
    .subscribe((workspace:WorkSpace)=>{
        this.workspace = workspace
        // Let the workspace load first then these are loaded
        this.loadArtifacts();
        this.loadMembers();
        this.getUserAsWorkspaceParticipant()
    })

  }

  private getUserAsWorkspaceParticipant()
  {
    this.workspaceService.workspaceUserAsParticipantObservable
    .subscribe((user : WorkspaceParticipant)=>{
      this.userAsWorkspaceParticipant = user
    })
  }

  private loadMembers()
  {
    this.workspaceService.getMembers(this.workspace.work_space_id)
    this.workspaceService.membersObservable
    .subscribe(observer=>{
      this.workspaceMembers = observer;
    })
  }

  private loadArtifacts()
  {
    this.workspaceService.getArtifacts(this.workspace.work_space_id)
    this.workspaceService.artifactsObservable.subscribe((artifacts:Artifact[])=>{
      this.artifacts = artifacts;
    })
  }

  public openAddMemberDialog()
  {
    // Open dialog to add user
    this.dialog.open(WorkSpaceAddMemberComponent,
      {
        width : "350px",
        data : {
          workspaceID : this.workspace.work_space_id
        }
      });
  }

  public openAddArtifactsDialog()
  {
    this.dialog.open(AddArtifactDialogComponent,
      {
        width : "350px",
        data : {
          workspaceID : this.workspace.work_space_id
        }
      });
  }
  
}
