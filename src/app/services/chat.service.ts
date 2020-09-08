import { Injectable } from '@angular/core';
import { Environment } from '../models/environment';
import { BehaviorSubject } from 'rxjs';
import { ActiveChats } from '../models/activeChats';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChatService {


  private activeChats = new BehaviorSubject<ActiveChats[]>(null);
  public activeChatsObservable = this.activeChats.asObservable();

  constructor(
    private environment : Environment,
    private httpClient : HttpClient
  ) { }

  public getActiveChats()
  {
    this.httpClient.get(this.environment.baseURL()+"api/chats/active-chats",
    {
      withCredentials : true
    }).subscribe((activeChats: ActiveChats[])=>{
      this.activeChats.next(activeChats);
    })
  }
}
