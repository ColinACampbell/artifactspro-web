import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artifact } from '../models/artifacts';
import { Observable } from 'rxjs';
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

  getAllArtifacts() : Observable<Artifact[]>
  {
    
    return this.httpClient.get<Artifact[]>(this.environment.baseURL()+"api/art",{
      withCredentials : true,
    });
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
}
