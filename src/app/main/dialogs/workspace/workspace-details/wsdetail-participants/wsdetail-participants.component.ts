import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { WorkSpace } from 'src/app/models/workspace';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { CreateDialogComponent } from '../../../artifacts/create-artifact-dialog/create-dialog.component';

@Component({
  selector: 'app-wsdetail-participants',
  templateUrl: './wsdetail-participants.component.html',
  styleUrls: ['./wsdetail-participants.component.css']
})
export class WsdetailParticipantsComponent implements OnInit {

  // Get the user role and responsibilities for a particular workspace

  public workspaceParticipants : WorkspaceParticipant[]
  public displayedColumns: string[] = ['name', 'email', 'role','action'];
  @Input('workspace') public workspace : WorkSpace;

  constructor(
    private workspaceService : WorkSpaceService,
    private dialog : MatDialog
  ) { }

  ngOnInit() {
    this.getWorkspaceParticipants()
    this.workspaceService.workspaceParticipantsObservable
    .subscribe((workspaceParticipants : WorkspaceParticipant[])=>{
      console.log(workspaceParticipants)
      this.workspaceParticipants = workspaceParticipants
    })
  }

  changeParticipantPermission(workspaceParticipant: WorkspaceParticipant) 
  { 
    // TODO Work on changing the user permission
  }

  public getWorkspaceParticipants()
  {
    this.workspaceService.getParticipants(this.workspace.work_space_id);
  }

}
