import { Injectable } from '@angular/core';
import { Environment } from '../models/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { ActiveChat } from '../models/activeChat';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { ChatMessage } from '../models/chatMessage';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  private activeChats = new BehaviorSubject<ActiveChat[]>(null);
  public activeChatsObservable = this.activeChats.asObservable();

  private chatMessages = new BehaviorSubject<ChatMessage[]>(null);
  public chatMessagesObservable = this.chatMessages.asObservable();

  constructor(
    private environment : Environment,
    private httpClient : HttpClient
  ) { }

  public getActiveChats()
  {
    this.httpClient.get(this.environment.baseURL()+"api/chats/active-chats",
    {
      withCredentials : true
    }).subscribe((activeChats: ActiveChat[])=>{
      this.activeChats.next(activeChats);
    })
  }

  public getMessagesFromChat(internalChatID : number)
  {
    this.httpClient.get<ChatMessage[]>(this.environment.baseURL()+`api/chats/${internalChatID}/load-messages`,
    {
      withCredentials : true
    })
    .subscribe((chatMessages : ChatMessage[])=>{
      this.chatMessages.next(chatMessages)
    })
  }

  public sendMessage(
    chatText : String, internalChatID : number, 
    timestamp : String, toUser : number, fromUser : number
    ) : Observable<HttpResponse<Object>>
  {
    
    return this.httpClient.post<HttpResponse<Object>>(this.environment.baseURL()+`api/chats/send-message`,{chatText, internalChatID, timestamp, toUser, fromUser },
    {
      withCredentials : true,
      observe : 'response'
    })
  }
}
