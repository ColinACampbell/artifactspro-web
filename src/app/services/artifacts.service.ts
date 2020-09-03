import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artifact } from '../models/artifacts';
import { Observable, BehaviorSubject } from 'rxjs';
import { Environment } from '../models/environment';

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

  getArtifactFromID(artID:number) : Observable<Artifact>
  {
    return this.httpClient.get<Artifact>(this.environment.baseURL()+`api/art/${artID}`,{
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

}
