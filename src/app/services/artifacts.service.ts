import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Artifact } from '../models/artifacts';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ArtifactsService {

  private url: String = 'http://localhost:3000/';
  private prod :boolean = false; // make this is always false when testing

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
}
