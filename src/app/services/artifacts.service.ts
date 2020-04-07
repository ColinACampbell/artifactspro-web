import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artifact } from '../models/artifacts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtifactsService {

  private url: String = 'http://localhost:3000/';
  private prod :boolean = true; // make this is always false when testing

  constructor(private httpClient: HttpClient) { 
    if (this.prod)
      this.url = "https://artifactspro.herokuapp.com/"
  }

  getAllArtifacts() : Observable<Artifact[]>
  {
    
    return this.httpClient.get<Artifact[]>(this.url+"api/art",{
      withCredentials : true,
    });
  }

  getArtifactFromID(artID:number) : Observable<Artifact>
  {
    return this.httpClient.get<Artifact>(this.url+`api/art/${artID}`,{
      withCredentials : true,
    });
  }

  createArtifact(name:String,description:String,date:String) : Observable<Artifact>
  {
    let date_created = date
    return this.httpClient.post<Artifact>(this.url+"api/art/create",{
      name,
      description,
      date_created
    },
    {
      withCredentials : true
    });
  }
}
