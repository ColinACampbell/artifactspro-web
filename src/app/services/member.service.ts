import { Injectable } from '@angular/core';
import { Environment } from '../models/environment';
import { HttpClient, HttpResponse } from '@angular/common/http';
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

  public getMemberAsUser() : Observable<Member>
  {
    return this.httpClient.get<Member>(this.environment.baseURL()+'api/members/user-as-member',{
      withCredentials : true
    })
  }

  // User ID of user, important to get org details
  public getMember(userID: number) : Observable<Member>
  {
    return this.httpClient.get<Member>(this.environment.baseURL()+`api/members/member-from-id?id=${userID}`,{
      withCredentials : true,
    })
  }

  // user ID is the user id of member whose role is being changed
  public changeMemberRole(role:string,userID:number) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.put<HttpResponse<Object>>(this.environment.baseURL()+`api/members/change-member-role`,{
      role,
      userID
    },{
      withCredentials : true,
      observe : 'response'
    })
  }

}
