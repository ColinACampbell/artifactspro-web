import { Injectable } from '@angular/core';
import { HttpEventType, HttpClient, HttpRequest } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { ADocument } from '../models/adocument';
import { Environment } from '../models/environment';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {


  private document = new BehaviorSubject<ADocument>(null)
  private documents = new BehaviorSubject<ADocument[]>(null)
  public documentObservable = this.document.asObservable();
  public documentsObservable = this.documents.asObservable();

  constructor(
    private httpClient: HttpClient,
    private environment:Environment
    ) { 
    
  }

  public getDocuments(artID:number)
  {
    const observer = this.httpClient.get<ADocument[]>(this.environment.baseURL()+`api/docs/from-art/${artID}`,
    {
      withCredentials : true,
    })

    observer.subscribe((documents:ADocument[])=>{
      this.documents.next(documents);
    })
  }

  public searchDocuments(artID : number, documentName : string, documentComments : string)
  {
    const observer = this.httpClient.get<ADocument[]>(this.environment.baseURL()+`api/docs/search/${artID}?documentName=${documentName}&documentComments=${documentComments}`,
    {
      withCredentials : true,
    })

    observer.subscribe((documents:ADocument[])=>{
      this.documents.next(documents);
    })
  }


  public uploadDocument(artID:number,document) 
  {
    const request = new HttpRequest('POST',this.environment.baseURL()+`api/docs/upload/${artID}`,document,{
      reportProgress:true,
      withCredentials:true,
    });

    return this.httpClient.request(request);
  }

  public providePreviewLink(artID:number,docID:number)
  {
    return this.httpClient.post(this.environment.baseURL()+`api/docs/link/${artID}/${docID}`,{},
    {
      withCredentials : true
    });
  }

  public deleteDocument(docID:number)
  {
    return this.httpClient.delete(this.environment.baseURL()+`api/docs/delete/${docID}`)
  }
}
