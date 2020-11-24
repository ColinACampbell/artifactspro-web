import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WorkspaceManagerService 
{

  constructor() { }

  private usersToAddToArtifactAccess = new BehaviorSubject<any[]>([]);
  public usersToAddToArtifactAccessObservable = this.usersToAddToArtifactAccess.asObservable()

  public updateUsersToAddToArtifactAccess(users : any[])
  {
    this.usersToAddToArtifactAccess.next(users)
  }

  public clearUsersToAddToArtifactAccess()
  {
    this.usersToAddToArtifactAccess.next([])
  }
}
