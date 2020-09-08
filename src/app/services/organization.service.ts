import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Organization } from '../models/organization';
import { Environment } from '../models/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {
  
  private jwtToken: string = localStorage.getItem("jwt_token")

  private organization : Organization;

  constructor(
    private httpClient: HttpClient,
    private environment: Environment) { 
    
  }

  public createOrganization(name,orgKey,orgPassKey) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.post<HttpResponse<Object>>(this.environment.baseURL()+"api/org/create",{
      name,
      orgKey,
      orgPassKey,
    },
    {
      withCredentials: true,
      observe : "response"
    })
  }

  public setOrganization(organization:Organization)
  {
    this.organization = organization;
  }

  public getOrganization()
  {
    return this.httpClient.get(this.environment.baseURL()+'api/org/info',
    {
      withCredentials : true,
    }).toPromise();
  }


  public getOrganizyionFromAccessCode(accessCode:String)
  {
    return this.httpClient.get(this.environment.baseURL()+`api/org/info-from/access-code/${accessCode}`,
    {
      withCredentials : true
    })
  }

  public addUserToOganization(accessCode:String) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.post<HttpResponse<Object>>(this.environment.baseURL()+`api/org//invite-from-code/${accessCode}`,
    {},{
      withCredentials : true,
      observe : "response"
    });
  }
}
