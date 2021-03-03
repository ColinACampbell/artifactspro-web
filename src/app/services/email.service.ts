import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from '../models/environment';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private httpClient : HttpClient,
    private environement : Environment) { }

  public sendEmailQuery(senderName,senderEmail,senderMessage) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.post<HttpResponse<Object>>(this.environement.baseURL()+`api/misc/email/send-query`,{
      senderName,
      senderEmail,
      senderMessage
    },{
      observe: "response"
    })
  }

}
