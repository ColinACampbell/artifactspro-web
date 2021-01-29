import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WorkSpace } from 'src/app/models/workspace';
import { WorkspaceParticipant } from 'src/app/models/workspaceParticipant';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { ConfirmDeleteWorkspaceComponent } from './confirm-delete-workspace/confirm-delete-workspace.component';

@Component({
  selector: 'app-wsdetail-overview',
  templateUrl: './wsdetail-overview.component.html',
  styleUrls: ['./wsdetail-overview.component.css']
})
export class WsdetailOverviewComponent implements OnInit {

  @Input('workspace') public workspace : WorkSpace;
  @Input('workspaceParticipantAsUser') public workspaceParticipantAsUser : WorkspaceParticipant
 
  public fieldsEditable : Boolean = false;

  constructor(
    private workspaceService : WorkSpaceService,
    private matDailog : MatDialog,
  ) { }

  ngOnInit() {
    //this.workspaceService.getWorkspaceInfo(this.workspace.work_space_id);
    this.workspaceService.principalWorkspaceObservable
    .subscribe((workspace:WorkSpace)=>{
      this.workspace = workspace;
    })
  }

  showDeleteWorkspaceDialog()
  {
    this.matDailog.open(ConfirmDeleteWorkspaceComponent,{
      data : {
        workspaceID : this.workspace.work_space_id,
        workspaceName : this.workspace.work_space_name
      },
      width : "400px"
    });
  }

  saveEdit()
  {
    this.workspaceService.updateWorkspaceInfo(
      this.workspace.work_space_id,
      this.workspace.work_space_name,
      this.workspace.work_space_description
    )
    this.fieldsEditable = false
  }

  makeFieldsEditable()
  {
    this.fieldsEditable = this.fieldsEditable ? false : true
  }

  cancelEdit()
  {
    this.fieldsEditable = false;
    this.workspaceService.getWorkspaceInfo(this.workspace.work_space_id);
  }
}
