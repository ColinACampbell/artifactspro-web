import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../models/environment';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor(
    private httpClient: HttpClient,
    private environment:Environment) { 
  
  }

  public signup(email:String,password:String)
  {
    let body = {email,password}

    return this.httpClient
    .post(this.environment.baseURL()+"api/user/signup/process-1",body,{
      withCredentials : true
    }).toPromise()
  }

  public login(email:String,password:String)
  {
    let body = {email,password}

    return this.httpClient
    .post(this.environment.baseURL()+"api/user/login",body,{
      withCredentials : true
    }).toPromise()
  }
}