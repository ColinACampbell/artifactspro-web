import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class JWTService {


  constructor() { }

  public setToken(token:string)
  {
    localStorage.setItem('token',token)
  }

  get jwtToken() : string
  {
    const token = localStorage.getItem('token')
    return token ? token : '';
  }


}
