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
import { ChatHeader } from 'src/app/models/chatHeader';
import { Observable } from 'rxjs';

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
  private selectedChatRoomID : number
  private recieverID : number;  
  private selectedActiveChat : ActiveChat;

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
      console.log(this.activeChats)
    })
    
    this.socket = io(this.environment.baseURL())
   
  }


  loadMessages(activeChat : ActiveChat)
  {
    this.selectedActiveChat = this.selectedActiveChat;
    this.selectedChatRoomID = activeChat.chat_room_id;
    this.recieverID = this.user.user_id === activeChat.sender_id ? activeChat.reciever_id : activeChat.sender_id

    this.chatService.getMessagesFromChat(activeChat.chat_room_id)
    this.chatService.chatMessagesObservable
    .subscribe((chatMessages: ChatMessage[])=>{
      this.chatMessages = chatMessages
    })
  }

  public sendMessage(content:String)
  {
    let timestamp = new Date().getTime()
    // Sends message to be created in the database
    this.chatService.sendMessage(content,this.selectedChatRoomID,`${timestamp}`,this.recieverID,this.user.user_id)
    .subscribe((response:HttpResponse<Object>)=>{
      console.log(response.status)

      // Reload messages for selected chat
      this.chatService.getMessagesFromChat(this.selectedChatRoomID)
      this.chatService.chatMessagesObservable.subscribe((chatMessages: ChatMessage[])=>{
      this.chatMessages = chatMessages;

      let audioFile = "./../../../../assets/sound_fx/msg_sent.mp3"
      let audio = new Audio();
      audio.src = audioFile;
      audio.load()
      audio.play()
      })
    })

    /**this.socket.emit("internal_message",{
      internalChatID : this.internalChatID,
      message : content})**/
  }

  determineFloat(chatMessage:ChatMessage)
  {
    return this.user.user_id === chatMessage.sender_id ? { 
      'justify-content' : 'flex-end',
      'display' : 'flex'
    } : {
      'justify-content' : 'flex-start',
      'display' : 'flex'
    }
  }

}
