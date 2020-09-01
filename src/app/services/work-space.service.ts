import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
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

  public artifactsSuggestion(artifactName:string,workspaceID:number) : Observable<any[]>
  {
    return this.httpClient.get<any[]>(this.environment.baseURL()+`api/workspace/${workspaceID}/suggestion/artifacts?artifactName=${artifactName}`,
    {
      withCredentials : true,
    }
    )
  }

  public addMember(workspaceID:number,email:string)
  {
    return this.httpClient.post(this.environment.baseURL()+`api/workspace/${workspaceID}/add-member`,
    {
      email
    },{
      withCredentials : true,
    })
  }

  public postMessage(workspaceID:number,title:String,content:String,time:number,date:String) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.post(this.environment.baseURL() + `api/workspace/${workspaceID}/add/message`,
    {
      title,
      content,
      time,
      date
    },{
      withCredentials:true,
      observe : 'response'
    });
  }

  public getMessages(workspaceID:number) : Observable<WorkSpacePost[]>
  {
    return this.httpClient.get<WorkSpacePost[]>(this.environment.baseURL() + `api/workspace/${workspaceID}/messages`,
    {
      withCredentials:true,
    });
  }

  public addArtifact(workspaceID:number,artifactName:string) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.post<HttpResponse<Object>>(this.environment.baseURL() + `api/workspace/${workspaceID}/artifact/add`,{artifactName},
    {
      withCredentials : true,
      observe : "response"
    })
  }

  public getWorkspacePost(workspaceID:number,messageID:number) : Observable<WorkSpacePost>
  {
    return this.httpClient.get<WorkSpacePost>(this.environment.baseURL() + `api/workspace/${workspaceID}/message/${messageID}`,
    {
      withCredentials : true
    })
  }

  public getWorkspacePostReplies(workspaceID:number,messageID:number) : Observable<WorkSpacePostReply[]> 
  {
    return this.httpClient.get<WorkSpacePostReply[]>(this.environment.baseURL()+`api/workspace/${workspaceID}/message/${messageID}/replies`,{
      withCredentials : true
    });
  }
}
