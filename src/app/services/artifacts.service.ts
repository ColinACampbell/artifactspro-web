import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Artifact } from '../models/artifacts';
import { Observable, BehaviorSubject } from 'rxjs';
import { Environment } from '../models/environment';
import { ArtifactPermission } from '../models/artifactPermissionsts';

@Injectable({
  providedIn: 'root'
})
export class ArtifactsService {

  constructor(
    private httpClient: HttpClient,
    private environment: Environment
    ) { 
  
  }

  private artifact = new BehaviorSubject<Artifact>(null);
  private artifacts = new BehaviorSubject<Artifact[]>(null);

  public artifactObservable = this.artifact.asObservable();
  public artifactsObservable = this.artifacts.asObservable();

  getAllArtifacts() : Observable<Artifact[]>
  {
    const observer = this.httpClient.get<Artifact[]>(this.environment.baseURL()+"api/art",{
      withCredentials : true,
    });

    observer.subscribe((artifacts : Artifact[])=>{
      this.artifacts.next(artifacts)
    })

    return observer;
  }

  public getAllArtifactsByWorkspace(workspaceName:string) : Observable<Artifact[]>
  {
    const observer = this.httpClient.get<Artifact[]>(this.environment.baseURL()+`api/art/get-by-workspace?workspaceName=${workspaceName}`,{
      withCredentials : true,
    });

    observer.subscribe((artifacts : Artifact[])=>{
      this.artifacts.next(artifacts)
    })

    return observer;
  }

  changeNameAndDescription(artifactName:string, artifactDescription: string, artifactID : number) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.put<HttpResponse<Object>>(this.environment.baseURL()+`api/art/${artifactID}/change-name-and-description`,{
      artifactName,
      artifactDescription
    },{
      withCredentials : true,
      observe : 'response'
    })
  }

  getArtifactFromID(artID:number,workspaceName : string) : Observable<Artifact>
  {
    return this.httpClient.get<Artifact>(this.environment.baseURL()+`api/art/${artID}?ref='${workspaceName}'`,{
      withCredentials : true,
    })
  }

  createArtifact(name:String,description:String,date:String) : Observable<Artifact>
  {
    let date_created = date
    return this.httpClient.post<Artifact>(this.environment.baseURL()+"api/art/create",{
      name,
      description,
      date_created
    },
    {
      withCredentials : true
    });
  }

  deleteArtifact(artID:number) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.delete<HttpResponse<Object>>(this.environment.baseURL()+`api/art/delete/${artID}`,
    {
      withCredentials : true,
      observe:"response"
    });
  } 

  nameSearch(key:string)
  {
    this.httpClient.get<Artifact[]>(this.environment.baseURL()+`api/art/search?key=${key}`,{
      withCredentials : true
    })
    .subscribe((artifacts:Artifact[])=>{
      this.artifacts.next(artifacts)
    })
  }

  public workspaceSearch(key:string,workspaceName:string)
  {
    this.httpClient.get<Artifact[]>(this.environment.baseURL()+`api/art/search-by-workspace?key=${key}&workspaceName=${workspaceName}`,{
      withCredentials : true
    })
    .subscribe((artifacts:Artifact[])=>{
      this.artifacts.next(artifacts)
    })
  }

  public getPermissionForArtifact(artID : number, workspaceName : string) : Observable<ArtifactPermission>
  {
    return this.httpClient.get<ArtifactPermission>(this.environment.baseURL()+`api/art/${artID}/permissions?workspaceName=${workspaceName}`,{
      withCredentials : true
    })
  }

  public getArtifactSize(artID : number) : Observable<{sum:string}>
  {
    return this.httpClient.get<{
      sum : string
    }>(this.environment.baseURL()+`api/art/${artID}/total-size`,{
      withCredentials : true
    });
  }


}
