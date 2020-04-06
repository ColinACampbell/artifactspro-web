import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ADocument } from '../models/adocument';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  private url: String = 'http://localhost:3000/';
  private prod :boolean = false; // make this is always false when testing

  constructor(private httpClient: HttpClient) { 
    if (this.prod)
      this.url = "https://artifactspro.herokuapp.com/"
  }


  public getDocuments(artID:number) : Observable<ADocument[]>
  {
    return this.httpClient.get<ADocument[]>(this.url+`api/docs/from-art/${artID}`,
    {
      withCredentials : true,
    })
  }
}
