import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  private url : String = 'http://localhost:3000/';
  private prod:boolean = true; // make this is always false when testing

  constructor(private httpClient: HttpClient) { 
    if (this.prod)
      this.url = "https://artifactspro.herokuapp.com/"
  }

  public signup(email:String,password:String)
  {
    let body = {email,password}
    console.log(body);
    return this.httpClient
    .post(this.url+"api/user/signup/process-1",body,{
      withCredentials : true
    }).toPromise()
  }
}
