import { Injectable } from '@angular/core';
import { Environment } from '../models/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class MemberService {

  private members = new BehaviorSubject<Member[]>(null);
  public membersObservable = this.members.asObservable();
  
  constructor(
    private httpClient: HttpClient,
    private environment:Environment
    ) { }

  public getAllMembers()
  {
    this.httpClient.get<Member[]>(this.environment.baseURL()+'api/members/all',
    {
      withCredentials: true
    }).subscribe((members : Member[])=>{
      this.members.next(members)
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
