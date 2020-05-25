import { Component, OnInit, Input } from '@angular/core';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { Artifact } from 'src/app/models/artifacts';
import { WorkSpace } from 'src/app/models/workspace';
import { MatDialog } from '@angular/material';
import { WorkSpaceAddMemberComponent } from './work-space-add-member/work-space-add-member.component';

@Component({
  selector: 'app-work-space-info-panel',
  templateUrl: './work-space-info-panel.component.html',
  styleUrls: ['./work-space-info-panel.component.css']
})
export class WorkSpaceInfoPanelComponent implements OnInit {

  @Input() workspaceID:number;
  public workspaceMembers:any[];
  public artifacts: Artifact[];

  constructor(
    private workspaceService:WorkSpaceService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loadArtifacts();
    this.loadMembers();
  }

  private loadMembers()
  {
    this.workspaceService.getMembers(this.workspaceID)
    .subscribe(observer=>{
      this.workspaceMembers = observer;
    })
  }

  private loadArtifacts()
  {
    this.workspaceService.getArtifacts(this.workspaceID)
    .subscribe((artifacts:Artifact[])=>{
      this.artifacts = artifacts;
    })
  }

  public openAddMemberDialog()
  {
    // Open dialog to add user
    this.dialog.open(WorkSpaceAddMemberComponent,
      {
        data : {
          workspaceID : this.workspaceID
        }
      });
  }
}
