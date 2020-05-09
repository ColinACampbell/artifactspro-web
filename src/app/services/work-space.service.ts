import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Environment } from '../models/environment';
import { WorkSpace } from '../models/workspace';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class WorkSpaceService {

  constructor(
    private httpClient: HttpClient,
    private environment: Environment,
  ) { }
  
  private getWorkSpaces() : Observable<WorkSpace[]>
  {
    return this.httpClient.get<WorkSpace[]>(this.environment.baseURL()+"api/workspace/all")
  }
}
