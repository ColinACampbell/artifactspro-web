import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { WorkspaceParticipant } from 'src/app/models/workspaceParticipant';
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

  public userRole : string;
  public isSureToDelete : Boolean = false 

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData : any,
    private workspaceService : WorkSpaceService,
    private matSnackBar : MatSnackBar,
    private dialogRef : MatDialogRef<WsdetailParticipantsActionDialogComponent>
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
      
    })
  }

  changeRole() 
  {
    this.workspaceService.changeParticipantPermission(
      this.dialogData.workspaceID,
      this.dialogData.participantID,
      this.selectedRole
      )

      this.matSnackBar.open("Participant's Permission Was Changed","Okay")
      .onAction()
      .subscribe((_)=>{
        this.dialogRef.close()
        this.matSnackBar.dismiss()
      })
  }


  public initRemoveParticipant()
  {
    this.isSureToDelete = true
  }

  // TODO Handle removing user from the a workspace
  public differDelete()
  {
    this.dialogRef.close()
    this.isSureToDelete = false;
  }
}
