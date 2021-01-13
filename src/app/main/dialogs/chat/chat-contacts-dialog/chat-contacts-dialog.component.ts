import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import {  MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user.service';
import { ChatService } from 'src/app/services/chat.service';
import { HttpResponse } from '@angular/common/http';
import { User } from 'src/app/models/user';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-chat-contacts-dialog',
  templateUrl: './chat-contacts-dialog.component.html',
  styleUrls: ['./chat-contacts-dialog.component.css']
})
export class ChatContactsDialogComponent implements OnInit, AfterViewInit {


  public isContactSelected = false;
  private selectedContact : Member;
  public members : Member[];
  public displayedColumns: string[] = ['name', 'email', 'action'];
  public dataSource : MatTableDataSource<Member>;
  private user : User;
  @ViewChild(MatPaginator,{}) paginator: MatPaginator;
  

  constructor(
    private membersService : MemberService,
    private userService : UserService,
    private chatService : ChatService
    ) { }

  ngOnInit() {

    this.userService.getUserInfo().subscribe((user:User)=>{
      this.user = user
    })

    this.membersService.getAllMembers()
    this.membersService.membersObservable.
    subscribe((members : Member[])=>{
      this.members = members;
    })

    this.dataSource = new MatTableDataSource<Member>(this.members); // Set Data Source
  }

  ngAfterViewInit()
  {
    this.dataSource.paginator = this.paginator
  }

  public selectContact(member:Member)
  {
    this.isContactSelected = true
    this.selectedContact = member
  }

  public sendMessage(messageContent: string)
  {
    const recieverID = this.selectedContact.user_id;
    const senderID = this.user.user_id;
    const timestamp = new Date().getTime();
    this.chatService.createChatAndChatRoom(senderID,recieverID,messageContent,timestamp)
    .subscribe((response:HttpResponse<Object>)=>{
      if (response.status === 200)
      {
        this.chatService.getActiveChats()
      }
    })
  }

}
