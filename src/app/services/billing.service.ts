import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from "@angular/common/http"
import { Environment } from '../models/environment';
import { Observable } from 'rxjs';
import PricePackage from '../models/pricePackage';

@Injectable({
  providedIn: 'root'
})
export class BillingService {

  constructor(
    private httpClient : HttpClient,
    private environment : Environment
  ) { }

  getPricePackages() : Observable<PricePackage[]>
  {
    return this.httpClient.get<PricePackage[]>(this.environment.baseURL()+"api/billing/get-all-plans")
  }

  verifyOrgCapacity(orgCode : string) : Observable<HttpResponse<Object>>
  {
    return this.httpClient.get<HttpResponse<Object>>(this.environment.baseURL()+`api/billing/verify/capacity?code=${orgCode}`)
  }

}
