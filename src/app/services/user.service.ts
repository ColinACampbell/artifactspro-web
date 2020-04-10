import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../models/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})


export class UserService {

  constructor(
    private httpClient: HttpClient,
    private environment:Environment,
    private router: Router) { 
  
  }


  public authUser()
  {
    this.httpClient.post(this.environment.baseURL()+'api/user/auth',{},
    {
      withCredentials : true,
    }).subscribe((event)=>{
      
    },(err)=>{
      let status = err['status'];
      console.log(this.router.url);

      let activeUrl = this.router.url;
      
      // if it contains anything with app in it
      if (status === 401 && activeUrl.includes('/app'))
        this.router.navigate(['/error'])

    })
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