import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Environment } from '../models/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from "src/app/models/user"

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private jwtToken: string = localStorage.getItem("jwt_token")
  private authHeader : Object = { "Authorization" : this.jwtToken }

  constructor(
    private httpClient: HttpClient,
    private environment: Environment,
    private router: Router) {


  }

  public authUser() {
    this.httpClient.post(this.environment.baseURL() + 'api/user/auth', {},
      {
        
        observe : 'response'
      }).subscribe((observer) => {
        // Do nothing  
      }, (err) => {
        let status = err.status
        let activeUrl = this.router.url;
        if (status === 401 && activeUrl.includes('/app'))
        {
          this.router.navigate(['/error'], { replaceUrl: true })
        }
      });
  }

  public signup(email: String, password: String) : Observable<HttpResponse<Object>> {

    let body = { email, password }

    return this.httpClient
      .post<HttpResponse<Object>>(this.environment.baseURL() + "api/user/sign-up", body,{observe:"response"})
  }

  public login(email: String, password: String, chosenOrgID: number) : Observable<HttpResponse<Object>>
   {
    let body = { email, password,chosenOrgID }

    return this.httpClient
      .post<HttpResponse<Object>>(this.environment.baseURL() + "api/user/login", body, {
        observe : "response"
      })
  }

  public getUserInfo(): Observable<User> {
    return this.httpClient.get<User>(this.environment.baseURL() + "api/user")
  }

  public verifyUser(first_name: String, last_name: String, accessCode) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.post(this.environment.baseURL() + `api/user/verify/${accessCode}`, {
      first_name,
      last_name
    }, {
      observe : "response"
    })
  }

  public updateBasicUserInfo(newFirstName:string, newLastName:string) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.put<HttpResponse<Object>>(this.environment.baseURL()+'api/user/',{
      newFirstName,
      newLastName
    },{
      observe : "response"
    })
  }


  public signOut() : Observable<HttpResponse<Object>>{
    return this.httpClient.post<HttpResponse<Object>>(this.environment.baseURL() + 'api/user/logout', {}, {
      observe : 'response'
    })
  }

  public isEmailValid(email:string)
  {
    const regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
    return regex.test(email);
  }

  public requestPasswordRecovery(email:string) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.post<HttpResponse<Object>>(this.environment.baseURL()+`api/user/password/recovery`,{
      email
    },{
      observe: 'response',
    })
  }

  public recoverPassword(recoveryCode:string,newPassword:string) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.put<HttpResponse<Object>>(this.environment.baseURL()+`api/user/password/recovery`,{
      recoveryCode,
      password: newPassword
    },{
      observe: 'response',
    })
  }

}