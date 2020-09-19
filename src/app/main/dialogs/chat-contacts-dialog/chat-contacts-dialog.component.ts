import { Component, OnInit } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';

@Component({
  selector: 'app-chat-contacts-dialog',
  templateUrl: './chat-contacts-dialog.component.html',
  styleUrls: ['./chat-contacts-dialog.component.css']
})
export class ChatContactsDialogComponent implements OnInit {


  public members : Member[];

  constructor(
    private membersService : MemberService
  ) { }

  ngOnInit() {
    this.membersService.getAllMembers()
    this.membersService.membersObservable.
    subscribe((members : Member[])=>{
      this.members = members;
    })
  }

}
