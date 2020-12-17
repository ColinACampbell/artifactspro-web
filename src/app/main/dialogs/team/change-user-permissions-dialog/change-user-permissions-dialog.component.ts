import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar' 
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-change-user-permissions-dialog',
  templateUrl: './change-user-permissions-dialog.component.html',
  styleUrls: ['./change-user-permissions-dialog.component.css']
})
export class ChangeUserPermissionsDialogComponent implements OnInit {

  public roles : string[] = []
  public potentialRoles : string[] = ['admin','member','guest']
  public selectedRole : string;
  public requestInProcess : Boolean = false;

  constructor(
    private dialogRef : MatDialogRef<ChangeUserPermissionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private memberService : MemberService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    // Note, the user ID is the ID of the selected member
    this.memberService.getMember(this.dialogData.userID)
    .subscribe((member: Member)=>{
      // TODO : In the future, merge this component with wsdetail-participants-action-dialog
      this.potentialRoles.forEach((role)=>{
        if (role !== member.role)
          this.roles.push(role)
      })
      this.selectedRole = member.role // set the user role on default
      this.roles.unshift(member.role) // add it to the start on the array
    })
  }

  public changeRole() {
    this.memberService.changeMemberRole(this.selectedRole,this.dialogData.userID)
    .subscribe((response:HttpResponse<Object>)=>{
      if (response.status === 200)
      {
        this.snackBar.open("Member role changed successfully","Okay")
        .onAction().subscribe((_)=>{
          this.dialogRef.close()
        })
        this.memberService.getAllMembers();
      }
    },(error)=>{
      this.snackBar.open("Looks like something went wrong under the hood. Please try again","Okay")
    })
  }

}
