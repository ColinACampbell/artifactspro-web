import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Organization } from '../models/organization';
import { Environment } from '../models/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {
  

  private currentOrgID : number = parseInt(localStorage.getItem("currentOrgID"));

  private organization : Organization;

  constructor(
    private httpClient: HttpClient,
    private environment: Environment) { 
    
  }

  public createOrganization(name,phone1:string,phone2:string,address1:string,address2:string,pricePackageID:number) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.post<HttpResponse<Object>>(this.environment.baseURL()+"api/org/create",{
      name,
      phone1,
      phone2,
      address1,
      address2,
      pricePackageID
    },
    {
      withCredentials: true,
      observe : "response"
    })
  }

  // TODO : Review to remove this
  public setOrganization(organization:Organization)
  {
    this.organization = organization;
  }

  public get currentOrganizationID() {
    return this.currentOrgID;
  }

  public set currentOrganizationID(id:number) {
    localStorage.setItem("currentOrgID",`${id}`)
    this.currentOrgID = id;
  }

  public getOrganization() : Observable<Organization>
  {
    return this.httpClient.get<Organization>(this.environment.baseURL()+'api/org/info',
    {
      withCredentials : true,
    })
  }

  public changeOrgInfo( orgName:string, phoneLine1:string, 
    phoneLine2:string, address1:string, address2:string,orgID:number) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.put<HttpResponse<Object>>(this.environment.baseURL()+`api/org/info?id=${orgID}`,{
      orgName, phoneLine1, phoneLine2, address1, address2
    },{
      observe:"response"
    })
  }

  public getOrganizations(): Observable<Organization[]>
  {
    return this.httpClient.get<Organization[]>(this.environment.baseURL()+'api/org/',{
      withCredentials: true
    })
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
    return this.httpClient.post<HttpResponse<Object>>(this.environment.baseURL()+`api/org/invite-from-code/${accessCode}`,
    {},{
      withCredentials : true,
      observe : "response"
    });
  }

  public switchOrganization(newOrgID: number) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.post<HttpResponse<Object>>(this.environment.baseURL()+`api/org/switch`,
    {
      newOrgID:newOrgID
    },{
      observe: "response"
    })
  }
}
