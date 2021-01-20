import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Environment } from 'src/app/models/environment';
import { ChatService } from 'src/app/services/chat.service';
import { ActiveChat } from 'src/app/models/activeChat';
import { UserService } from 'src/app/services/user.service';
import { ChatMessage } from 'src/app/models/chatMessage';
import { HttpResponse } from '@angular/common/http';
import { SocketService } from 'src/app/services/socket.service';
import { UtilService } from 'src/app/services/util.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private chatService: ChatService,
    private userService: UserService,
    private socketService: SocketService,
    public utilService : UtilService // used in template
  ) { }

  public user: User;
  public activeChats: ActiveChat[]
  public chatMessages: ChatMessage[]
  private selectedChatRoomID: number
  private recieverID: number;
  //private selectedActiveChat: ActiveChat;
  public isChatSelected: Boolean = false;

  private audioFile = new Audio("./../../../../assets/sound_fx/msg_sent.mp3");


  @ViewChild('scrollMe', {}) private myScrollContainer: ElementRef;

  async ngOnInit() {

    this.scrollToBottom();
    //this.audioFile.load();
    this.chatService.activeChatsObservable
      .subscribe((activeChats: ActiveChat[]) => {
        this.activeChats = activeChats
        console.log(this.activeChats)
      })

    this.chatService.chatMessagesObservable
      .subscribe((chatMessages: ChatMessage[]) => {
        this.chatMessages = chatMessages
      })

    await this.userService.getUserInfo().subscribe((user: User) => {
      this.user = user;
      this.user.full_name = user.first_name + " " + user.last_name
    })

    this.getActiveChats();

    this.socketService.socket.on("update_chat_room", (val) => {
      if (val.chatRoomID === this.selectedChatRoomID) {
        this.getMessages(val.chatRoomID)
        this.getActiveChats()
      } else {
        this.getActiveChats()
      }

    })

  }

  /** 
  loadMessages(activeChat: ActiveChat) {
    this.selectedActiveChat = this.selectedActiveChat;
    this.isChatSelected = true;
    this.selectedChatRoomID = activeChat.chat_room_id;
    this.recieverID = this.user.user_id === activeChat.sender_id ? activeChat.reciever_id : activeChat.sender_id
    this.getMessages(activeChat.chat_room_id)
    this.socketService.socket.emit("join_room", this.selectedChatRoomID)
  }**/


  public onAcitveChatSelected(event: any) {
    this.isChatSelected = event.isChatSelected
    this.selectedChatRoomID = event.selectedChatRoomID;
    this.recieverID = event.recieverID;
  }

  private getMessages(chatRoomID: number) {
    this.chatService.getMessagesFromChat(chatRoomID)
  }

  public sendMessage(content: String) {
    let timestamp = new Date().getTime()
    // Sends message to be created in the database
    this.chatService.sendMessage(content, this.selectedChatRoomID, `${timestamp}`, this.recieverID, this.user.user_id)
      .subscribe((response: HttpResponse<Object>) => {
        console.log(response.status)

        // Reload messages for selected chat
        this.chatService.getMessagesFromChat(this.selectedChatRoomID)
        this.chatService.chatMessagesObservable.subscribe((chatMessages: ChatMessage[]) => {
          this.chatMessages = chatMessages;
        })
      })

    this.socketService.socket.emit("internal_message", {
      chatRoomID: this.selectedChatRoomID,
      message: content
    })
    this.audioFile.play()

  }

  private async getActiveChats() {
    await this.chatService.getActiveChats();

  }

  determineFloat(chatMessage: ChatMessage) {
    return this.user.user_id === chatMessage.sender_id ? {
      'justify-content': 'flex-end',
      'display': 'flex'
    } : {
        'justify-content': 'flex-start',
        'display': 'flex'
      }

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    try {
      this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }


  getTimeDifference(timestamp : number)
  {
    const current = new Date().getTime();
    return this.utilService.timeDifference(current,timestamp);
  }
}
