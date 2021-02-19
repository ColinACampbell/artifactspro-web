import { Injectable } from '@angular/core';


interface AuthorizedArtifacts
{
  artifactID : number
}

@Injectable({
  providedIn: 'root'
})
export class ArtifactManagerService {

  private currentAuthorizedArtifact : number;
  public authorizedArtifacts : AuthorizedArtifacts[] = [];
  private userForbidden : boolean = false;

  constructor() { }

  public addAuthorizedArtifact(authorizedArtifact)
  {
    this.authorizedArtifacts.push(authorizedArtifact)
  }

  public setCurrentAuthorizedArtifact()
  {

  }

  public hasAccessFromAuth(artifactID : number) : Boolean
  {   
    const hasAccess = this.authorizedArtifacts.some((authArt : AuthorizedArtifacts)=>{
      return artifactID === authArt.artifactID  
    })
    return hasAccess
  }

  get isUserForbidden() {
    return this.userForbidden
  }
  
}
