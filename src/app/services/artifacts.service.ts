import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  getArtifactFromID(artID:number,workspaceName : string) : Observable<Artifact>
  {
    return this.httpClient.get<Artifact>(this.environment.baseURL()+`api/art/${artID}?ref='${workspaceName}'`,{
      withCredentials : true,
    });
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

  deleteArtifact(artID:number)
  {
    return this.httpClient.delete(this.environment.baseURL()+`api/art/delete/${artID}`,
    {
      withCredentials : true
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

}
