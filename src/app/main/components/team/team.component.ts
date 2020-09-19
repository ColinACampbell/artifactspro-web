import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { Member } from 'src/app/models/member';
import { MatDialog } from '@angular/material';
import { InviteDialogComponent } from './../../dialogs/team-invite-dialog/invite-dialog.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  public members:Member[];

  displayedColumns: string[] = ['name', 'email', 'role','action'];
  
  constructor(private membersService:MemberService,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.membersService.getAllMembers()
    this.membersService.membersObservable.
    subscribe((members : Member[])=>{
      this.members = members;
    })
  }

 
  public openInviteTeamDialog()
  {
    this.dialog.open(InviteDialogComponent);
  }

}
