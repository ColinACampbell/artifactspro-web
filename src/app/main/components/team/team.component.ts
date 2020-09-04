import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { PartialObserver } from 'rxjs';
import { Members } from 'src/app/models/members';
import { MatDialog } from '@angular/material';
import { InviteDialogComponent } from './../../dialogs/team-invite-dialog/invite-dialog.component';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  public members:Members[];

  displayedColumns: string[] = ['name', 'email', 'role','action'];
  
  constructor(private membersService:MemberService,
    private dialog:MatDialog) { }

  ngOnInit() {
    this.getAllMembers();
  }

  private getAllMembers()
  {
    this.membersService.getAllMembers()
    .subscribe((members:Members[])=>{
      this.members = members;
    })
  }

  public openInviteTeamDialog()
  {
    this.dialog.open(InviteDialogComponent);
  }

}
