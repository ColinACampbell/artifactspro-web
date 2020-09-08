import { Component, OnInit, ViewChild } from '@angular/core';
import * as io from "socket.io-client";
import { Environment } from 'src/app/models/environment';
import { MatSelectionList, MatListOption } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ChatService } from 'src/app/services/chat.service';
import { ActiveChats } from 'src/app/models/activeChats';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private environment : Environment,
    private chatService : ChatService,
    private userService : UserService
  ) { }

  private socket: any;
  public user : User;
  public activeChats : ActiveChats[]
  
  async ngOnInit() {

    await this.userService.getUserInfo().subscribe((user :User)=>{
      this.user = user;
    })

    this.chatService.getActiveChats();
    this.chatService.activeChatsObservable
    .subscribe((activeChats : ActiveChats[])=>{
      this.activeChats = activeChats

    })
    
    this.socket = io(this.environment.baseURL())
    this.socket.emit("foo","Hello World")
    this.socket.on("demo_event",(value)=>{
      console.log(value);
    })
  }

  public sendMessage(content:String)
  {
    console.log(content)
  }

  openStartNewChatDialog()
  {
    
  }
}
