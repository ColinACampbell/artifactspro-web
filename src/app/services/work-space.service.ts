import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../models/environment';
import { WorkSpace } from '../models/workspace';
import { Observable } from 'rxjs/internal/Observable';
import { Artifact } from '../models/artifacts';

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceService {

  constructor(
    private httpClient: HttpClient,
    private environment: Environment,
  ) { }
  
  public getWorkSpaces() : Observable<WorkSpace[]>
  {
    return this.httpClient.get<WorkSpace[]>(this.environment.baseURL()+"api/workspace/all",
    {
      withCredentials: true
    })
  }

  public createWorkSpace(name:String,dateCreated:String) : Observable<any>
  {
    return this.httpClient.post(this.environment.baseURL()+'api/workspace/create',{
      workspace_name: name,
      date_created:dateCreated
    },
    {
      withCredentials : true
    })
  }

  public getWorkspaceInfo(workspaceID:number) : Observable<WorkSpace>
  {
    return this.httpClient.get<WorkSpace>(this.environment.baseURL()+`api/workspace/${workspaceID}`,{
      withCredentials:true
    });
  }

  // TODO : Test this method
  public getMembers(workspaceID:number) : Observable<any[]>
  {
    return this.httpClient.get<any[]>(this.environment.baseURL()+`api/workspace/${workspaceID}/members`,{
      withCredentials:true
    })
  }

  public getArtifacts(workspaceID:number) : Observable<Artifact[]>
  {
    return this.httpClient.get<Artifact[]>(this.environment.baseURL()+`api/workspace/${workspaceID}/artifacts`,{
      withCredentials:true
    });
  }

  public emailSuggestion(email:string) : Observable<any[]>
  {
    return this.httpClient.get<any[]>(this.environment.baseURL()+`api/workspace/suggestion/email?email=${email}`,
    {
      withCredentials:true
    })
  }

  public addMember(workspaceID:number,email:string)
  {
    return this.httpClient.post(this.environment.baseURL()+`api/workspace/${workspaceID}/add`,
    {
      email
    },{
      withCredentials : true,
    })
  }
}
