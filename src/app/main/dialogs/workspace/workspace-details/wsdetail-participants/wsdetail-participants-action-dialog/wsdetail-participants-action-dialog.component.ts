import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material';
import { WorkSpaceService } from 'src/app/services/work-space.service';

@Component({
  selector: 'app-wsdetail-participants-action-dialog',
  templateUrl: './wsdetail-participants-action-dialog.component.html',
  styleUrls: ['./wsdetail-participants-action-dialog.component.css']
})
export class WsdetailParticipantsActionDialogComponent implements OnInit {

  public potentialRoles : string[] = ['admin','member','guest']
  public selectedRole : string;
  public requestInProcess : Boolean = false
  public roles : string[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData : any,
    private workspaceService : WorkSpaceService
  ) { }

  ngOnInit() {

    this.workspaceService.getParticipant(this.dialogData.workspaceID,this.dialogData.participantID)
    .subscribe((participant : WorkspaceParticipant)=>{
      this.potentialRoles.forEach((role)=>{
        if (role !== participant.role)
          this.roles.push(role)
      })
      this.selectedRole = participant.role // set the user role on default
      this.roles.unshift(participant.role) // add it to the start on the array
      console.log(this.roles)
    })
  }




  changeRole() 
  {

  }

}
