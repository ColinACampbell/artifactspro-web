import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'src/app/models/member';
import { WorkSpace } from 'src/app/models/workspace';
import { WorkspaceParticipant } from 'src/app/models/workspaceParticipant';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { CreateDialogComponent } from '../../../artifacts/create-artifact-dialog/create-dialog.component';
import { WsdetailParticipantsActionDialogComponent } from './wsdetail-participants-action-dialog/wsdetail-participants-action-dialog.component';

@Component({
  selector: 'app-wsdetail-participants',
  templateUrl: './wsdetail-participants.component.html',
  styleUrls: ['./wsdetail-participants.component.css']
})
export class WsdetailParticipantsComponent implements OnInit {

  // Get the user role and responsibilities for a particular workspace

  public workspaceParticipants : WorkspaceParticipant[]
  public displayedColumns: string[] = ['name', 'email', 'role','action'];
  public memberAsUser : Member // get the role of the user in the context of the workspace

  @Input('workspace') public workspace : WorkSpace;
  @Input('workspaceParticipantAsUser') public workspaceParticipantAsUser: WorkspaceParticipant

  constructor(
    private workspaceService : WorkSpaceService,
    private dialog : MatDialog
  ) { }

  ngOnInit() {
    this.getWorkspaceParticipants()
    this.workspaceService.workspaceParticipantsObservable
    .subscribe((workspaceParticipants : WorkspaceParticipant[])=>{
      this.workspaceParticipants = workspaceParticipants
    })
  }

  changeParticipantPermission(workspaceParticipant: WorkspaceParticipant) 
  { 
    this.dialog.open(WsdetailParticipantsActionDialogComponent,
      {
        data : {
          participantID : workspaceParticipant.work_space_member_id,
          workspaceID : this.workspace.work_space_id,
          userRole : this.workspaceParticipantAsUser.role
        }
      })
  }

  public getUserAsAMember()
  {
    //this.workspaceService.
  }

  public getWorkspaceParticipants()
  {
    this.workspaceService.getParticipants(this.workspace.work_space_id);
  }

}
