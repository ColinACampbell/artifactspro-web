import { Injectable } from '@angular/core';
import * as io from "socket.io-client";
import { Environment } from '../models/environment';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  private socketConn : any;

  constructor(
    private environment : Environment
  ) { 
    this.socketConn = io(this.environment.baseURL())
  }

  get socket () {
    return this.socketConn
  }
}
