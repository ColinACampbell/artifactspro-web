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
    let found = false
    this.authorizedArtifacts.forEach((authArt : AuthorizedArtifacts)=>{
      if (artifactID === authArt.artifactID)
        found = true
    })
    return found
  }
}
