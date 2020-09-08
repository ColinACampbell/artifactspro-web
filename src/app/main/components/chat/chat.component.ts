import { Component, OnInit } from '@angular/core';
import * as io from "socket.io-client";
import { Environment } from 'src/app/models/environment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(
    private environment : Environment
  ) { }


  private socket: any;

  ngOnInit() {
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
