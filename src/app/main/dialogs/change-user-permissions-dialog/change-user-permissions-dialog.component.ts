import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private memberService : MemberService
  ) { }

  ngOnInit() {
    this.memberService.getMember(this.dialogData.userID)
    .subscribe((member: Member)=>{
      this.potentialRoles.forEach((role)=>{
        if (role !== member.role)
          this.roles.push(role)
      })
      this.selectedRole = member.role
      this.roles.unshift(member.role)
    })
  }

  private getMemberInfo()
  {

  }

}
