import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Organization } from '../models/organization';

@Injectable({
  providedIn: 'root'
})

export class OrganizationService {
  
  private url: String = 'http://localhost:3000/';
  private prod :boolean = false; // make this is always false when testing
  private organization : Organization;

  constructor(private httpClient: HttpClient) { 
    if (this.prod)
      this.url = "https://artifactspro.herokuapp.com/"
  }

  public createOrganization(name,orgKey,orgPassKey)
  {
    return this.httpClient.post(this.url+"api/org/create",{
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
    return this.httpClient.get(this.url+'api/org/info',
    {
      withCredentials : true,
    }).toPromise();
  }
}
