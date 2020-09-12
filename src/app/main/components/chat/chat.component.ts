import { Component, OnInit, ViewChild } from '@angular/core';
import * as io from "socket.io-client";
import { Environment } from 'src/app/models/environment';
import { MatSelectionList, MatListOption } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { ChatService } from 'src/app/services/chat.service';
import { ActiveChat } from 'src/app/models/activeChat';
import { UserService } from 'src/app/services/user.service';
import { ChatMessage } from 'src/app/models/chatMessage';
import { HttpResponse } from '@angular/common/http';

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
  public activeChats : ActiveChat[]
  public chatMessages : ChatMessage[]
  private internalChatID : number;
  private senderID : number;  

  async ngOnInit() {

    await this.userService.getUserInfo().subscribe((user :User)=>{
      this.user = user;
      this.user.full_name = user.first_name + " " + user.last_name
      console.log(this.user)
    })

    await this.chatService.getActiveChats();
    await this.chatService.activeChatsObservable
    .subscribe((activeChats : ActiveChat[])=>{
      this.activeChats = activeChats
      console.log("Active Chats")
      console.log(this.activeChats)
    })
    
    this.socket = io(this.environment.baseURL())
   
  }

  public sendMessage(content:String)
  {

    this.chatService.sendMessage(content,this.internalChatID,"",this.senderID,this.user.user_id)
    .subscribe((response:HttpResponse<Object>)=>{
      console.log(response.status)
      this.chatService.getMessagesFromChat(this.internalChatID)
      this.chatService.chatMessagesObservable.subscribe((chatMessages: ChatMessage[])=>{
      this.chatMessages = chatMessages;
      })
    })

    /**this.socket.emit("internal_message",{
      internalChatID : this.internalChatID,
      message : content})**/
  }


  public loadMessages(activeChat : ActiveChat)
  {
    console.log(activeChat)
    this.senderID = activeChat.sender_id === this.user.user_id ? activeChat.reciever_id : activeChat.sender_id
    console.log(this.senderID)
    this.internalChatID = activeChat.internal_chat_id
    this.socket.emit("join_room",this.internalChatID) // join for that chat
    this.chatService.getMessagesFromChat(this.internalChatID)
    this.chatService.chatMessagesObservable.subscribe((chatMessages: ChatMessage[])=>{
      this.chatMessages = chatMessages;
    })
  }


  determineFloat(chatMessage : ChatMessage)
  {
    return this.user.user_id == chatMessage.from_user ? { 
      'justify-content' : 'end',
      'display' : 'flex'
    } : {
      'justify-content' : 'start',
      'display' : 'flex'
    }
  }
  openStartNewChatDialog()
  {
    
  }
}
