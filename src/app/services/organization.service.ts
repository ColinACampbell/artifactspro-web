import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../models/organization';
import { Environment } from '../models/environment';

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {
  
  private organization : Organization;

  constructor(
    private httpClient: HttpClient,
    private environment: Environment) { 
    
  }

  public createOrganization(name,orgKey,orgPassKey)
  {
    return this.httpClient.post(this.environment.baseURL()+"api/org/create",{
      name,
      orgKey,
      orgPassKey,
    },
    {
      withCredentials : true
    }).toPromise();
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

  public addUserToOganization(accessCode:String)
  {
    return this.httpClient.post(this.environment.baseURL()+`api/org//invite-from-code/${accessCode}`,
    {},{
      withCredentials : true
    });
  }
}
