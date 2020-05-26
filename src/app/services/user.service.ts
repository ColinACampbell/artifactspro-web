import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../models/environment';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(
    private httpClient: HttpClient,
    private environment: Environment,
    private router: Router) {
  }

  public authUser() {
    this.httpClient.post(this.environment.baseURL() + 'api/user/auth', {},
      {
        withCredentials: true,
        observe : 'response'
      }).subscribe((observer) => {
        console.log(observer.status)
        // Do nothing  
      }, (err) => {

        let status = err.status
        console.log(status);
        let activeUrl = this.router.url;
        if (status === 401 && activeUrl.includes('/app'))
        this.router.navigate(['/error'], { replaceUrl: true })
      });
  }

  public signup(email: String, password: String) {
    let body = { email, password }

    return this.httpClient
      .post(this.environment.baseURL() + "api/user/signup/process-1", body, {
        withCredentials: true
      }).toPromise()
  }

  public login(email: String, password: String) {
    let body = { email, password }

    return this.httpClient
      .post(this.environment.baseURL() + "api/user/login", body, {
        withCredentials: true
      }).toPromise()
  }

  public getUserInfo(): Observable<User> {
    return this.httpClient.get<User>(this.environment.baseURL() + "api/user/info",
      {
        withCredentials: true
      })
  }

  public verifyUser(first_name: String, last_name: String, accessCode) {
    return this.httpClient.post(this.environment.baseURL() + `api/user/verify/${accessCode}`, {
      first_name,
      last_name
    }, {
      withCredentials: true
    })
  }

  public signOut() {
    return this.httpClient.post(this.environment.baseURL() + 'api/user/logout', {}, {
      withCredentials: true,
    })
  }
}