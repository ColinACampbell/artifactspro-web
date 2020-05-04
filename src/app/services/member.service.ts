import { Injectable } from '@angular/core';
import { Environment } from '../models/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Members } from '../models/members';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  constructor(
    private httpClient: HttpClient,
    private environment:Environment
    ) { }

  public getAllMembers() : Observable<Members[]>
  {
    return this.httpClient.get<Members[]>(this.environment.baseURL()+'api/members/all',
    {
      withCredentials: true
    })
  }

  public getInviteURL()
  {
    return this.httpClient.get(this.environment.baseURL()+'api/members/invite-code',
    {
      withCredentials:true,
    })
  }
}
