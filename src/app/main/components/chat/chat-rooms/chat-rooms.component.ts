import { Component, Input, OnInit, Output } from '@angular/core';
import { EventEmitter } from '@angular/core';
import { ActiveChat } from 'src/app/models/activeChat';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-chat-rooms',
  templateUrl: './chat-rooms.component.html',
  styleUrls: ['./chat-rooms.component.css']
})
export class ChatRoomsComponent implements OnInit {


  @Output() onActiveChat: EventEmitter<any> = new EventEmitter();
  @Input() user : User;
  @Input() activeChats : ActiveChat[]

  constructor(
    private chatService : ChatService
  ) { }

  ngOnInit() {

  }

  loadMessages(activeChat : ActiveChat)
  {
    //let selectedActiveChat = this.selectedActiveChat;
    let isChatSelected = true;
    let selectedChatRoomID = activeChat.chat_room_id;
    // TODO : Work on isolating the user object in this component
    let recieverID = this.user.user_id === activeChat.sender_id ? activeChat.reciever_id : activeChat.sender_id
    this.chatService.getMessagesFromChat(activeChat.chat_room_id)

    // Emit selected chat info to the parent
    this.onActiveChat.emit({
      isChatSelected,
      selectedChatRoomID,
      recieverID,
      activeChat
    })
    //let socket.emit("join_room",this.selectedChatRoomID)
  } 

}
