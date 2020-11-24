import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Environment } from '../models/environment';
import { WorkSpace } from '../models/workspace';
import { Observable } from 'rxjs/internal/Observable';
import { Artifact } from '../models/artifacts';
import { BehaviorSubject } from 'rxjs';
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceService {

  

  private workspacePosts = new BehaviorSubject<WorkSpacePost[]>(null);
  public workspacePostsObservable = this.workspacePosts.asObservable();

  private workspacePostReplies = new BehaviorSubject<WorkSpacePostReply[]>(null);
  public workspacePostRepliesObservable = this.workspacePostReplies.asObservable();

  private workspaces = new BehaviorSubject<WorkSpace[]>(null);
  public workspacesObservable = this.workspaces.asObservable();

  private members = new BehaviorSubject<Member[]>(null);
  public membersObservable = this.members.asObservable();

  private artifacts = new BehaviorSubject<Artifact[]>(null)
  public artifactsObservable = this.artifacts.asObservable();

  private principalWorkspace = new BehaviorSubject<WorkSpace>(null);
  public principalWorkspaceObservable = this.principalWorkspace.asObservable();

  private workspaceParticipants = new BehaviorSubject<WorkspaceParticipant[]>(null);
  public workspaceParticipantsObservable = this.workspaceParticipants.asObservable();

  constructor(
    private httpClient: HttpClient,
    private environment: Environment,
  ) { }

  public getWorkspaceNames() : Observable<any[]>
  {
    return this.httpClient.get<any[]>(this.environment.baseURL()+`api/workspace/names`,
    {
      withCredentials : true
    })
  }

  public getWorkSpaces() {
    this.httpClient.get<WorkSpace[]>(this.environment.baseURL() + "api/workspace/all",
      {
        withCredentials: true
      }).subscribe((workspaces: WorkSpace[]) => {
        this.workspaces.next(workspaces)
      })
  }

  public createWorkSpace(name: String, description: String,dateCreated: String): Observable<HttpResponse<Object>> {
    return this.httpClient.post<HttpResponse<Object>>(this.environment.baseURL() + 'api/workspace/create', {
      workspace_name: name,
      date_created: dateCreated,
      description
    },
      {
        withCredentials: true,
        observe : "response",
      })
  }


  // TODO : Test this method
  public getMembers(workspaceID: number)
  {
    return this.httpClient.get<Member[]>(this.environment.baseURL() + `api/workspace/${workspaceID}/members`, {
      withCredentials: true
    }).subscribe((members: Member[])=>{
      this.members.next(members)
    })
  }

  public getArtifacts(workspaceID: number) {
    return this.httpClient.get<Artifact[]>(this.environment.baseURL() + `api/workspace/${workspaceID}/artifacts`, {
      withCredentials: true
    }).subscribe((artifacts: Artifact[]) => {
      this.artifacts.next(artifacts)
    });
  }

  public emailSuggestion(email: string): Observable<any[]> {
    return this.httpClient.get<any[]>(this.environment.baseURL() + `api/workspace/suggestion/email?email=${email}`,
      {
        withCredentials: true
      })
  }

  public suggestEmailForUserInWorkspace(workspaceID : number, email: string) : Observable<any[]>
  {
    return this.httpClient.get<any[]>(this.environment.baseURL()+`api/workspace/${workspaceID}/user-emails-in-workspace?email=${email}`,
    {
      withCredentials: true
    })
  }

  public artifactsSuggestion(artifactName: string, workspaceID: number): Observable<any[]> {
    return this.httpClient.get<any[]>(this.environment.baseURL() + `api/workspace/${workspaceID}/suggestion/artifacts?artifactName=${artifactName}`,
      {
        withCredentials: true,
      }
    )
  }

  public addMember(workspaceID: number, email: string) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.post<HttpResponse<Object>>(this.environment.baseURL() + `api/workspace/${workspaceID}/add-member`,
      {
        email
      }, {
      withCredentials: true,
      observe : "response"
    })
  }

  public postMessage(workspaceID: number, title: String, content: String, time: number, date: String, artifactName: String): Observable<HttpResponse<Object>> {
    return this.httpClient.post(this.environment.baseURL() + `api/workspace/${workspaceID}/add/message`,
      {
        title,
        content,
        time,
        date,
        artifactName
      }, {
      withCredentials: true,
      observe: 'response'
    });
  }

  public getMessages(workspaceID: number) {
    this.httpClient.get<WorkSpacePost[]>(this.environment.baseURL() + `api/workspace/${workspaceID}/messages`,
      {
        withCredentials: true,
      }).subscribe((workspacePosts: WorkSpacePost[]) => {
        this.workspacePosts.next(workspacePosts)
      });
  }

  public addArtifact(workspaceID: number, artifactName: string): Observable<HttpResponse<Object>> {
    return this.httpClient.post<HttpResponse<Object>>(this.environment.baseURL() + `api/workspace/${workspaceID}/artifact/add`, { artifactName },
      {
        withCredentials: true,
        observe: "response"
      })
  }

  public getWorkspacePost(workspaceID: number, messageID: number): Observable<WorkSpacePost> {
    return this.httpClient.get<WorkSpacePost>(this.environment.baseURL() + `api/workspace/${workspaceID}/message/${messageID}`,
      {
        withCredentials: true
      })
  }

  public getWorkspacePostReplies(workspaceID: number, messageID: number) {
    this.httpClient.get<WorkSpacePostReply[]>(this.environment.baseURL() + `api/workspace/${workspaceID}/message/${messageID}/replies`, {
      withCredentials: true
    })
      .subscribe((workspacePostReplies: WorkSpacePostReply[]) => {
        this.workspacePostReplies.next(workspacePostReplies)
      });
  }

  public postWorkspacePostReply(workspaceID: number, messageID: number, content: String, actionType: String, timestamp: number): Observable<HttpResponse<Object>> {
    return this.httpClient.post<HttpResponse<Object>>(this.environment.baseURL() + `api/workspace/${workspaceID}/message/${messageID}/reply`, {
      content,
      actionType,
      timestamp
    }, {
      observe: "response",
      withCredentials: true
    })
  }

  public nameSearch(key:string,) 
  {
    this.httpClient.get<WorkSpace[]>(this.environment.baseURL()+`api/workspace/search?key=${key}`,{
      withCredentials : true
    })
    .subscribe((workspaces : WorkSpace[])=>{
      this.workspaces.next(workspaces)
    })
  }

  public getWorkspaceInfo(workspaceID: number) 
  {
    this.httpClient.get<WorkSpace>(this.environment.baseURL() + `api/workspace/${workspaceID}`, {
      withCredentials: true
    }).subscribe((workspace : WorkSpace)=>{
      this.principalWorkspace.next(workspace);
    });

  }

  public updateWorkspaceInfo(workspaceID: number, workspaceName: String, workspaceDsc: String)
  {
    this.httpClient.put(this.environment.baseURL()+`api/workspace/${workspaceID}/submit-change`,{
      workspaceName,
      workspaceDsc
    },{
      withCredentials : true
    }).subscribe((_)=>{
      this.getWorkspaceInfo(workspaceID)
    })
    
  }

  public getParticipants(workspaceID : number)
  {
    this.httpClient.get<WorkspaceParticipant[]>(this.environment.baseURL()+`api/workspace/${workspaceID}/all-participants`,{
      withCredentials : true
    }).subscribe((workspaceParticipants : WorkspaceParticipant[])=>{
      this.workspaceParticipants.next(workspaceParticipants)
    })
  }

  public getParticipant(workspaceID : number, participantID : number) : Observable<WorkspaceParticipant>
  {
    return this.httpClient.get<WorkspaceParticipant>(this.environment.baseURL()+`api/workspace/${workspaceID}/get-participant?id=${participantID}`,
    {
      withCredentials : true
    })
  }


  public changeParticipantPermission(workspaceID : number, participantID : number, newRole : string)
  {
    this.httpClient.put(this.environment.baseURL() + `api/workspace/${workspaceID}/change-participant-role`,
    {
      participantID,
      newRole
    },{
      withCredentials : true
    }).subscribe(()=>{
      this.getParticipants(workspaceID)
    })
  }

}
