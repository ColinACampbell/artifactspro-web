import { HttpResponse } from '@angular/common/http';
import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ArtifactManagerService } from 'src/app/services/util/artifact-manager.service';
import { WorkSpaceService } from 'src/app/services/work-space.service';

@Component({
  selector: 'app-artifact-authorization',
  templateUrl: './artifact-authorization.component.html',
  styleUrls: ['./artifact-authorization.component.css']
})
export class ArtifactAuthorizationComponent implements OnInit {


  @Input('responseMessage')
  public responseMessage : string
  @Input('workspaceRef')
  public workspaceReference : string = ''
  @Input('artifactID')
  public artifactID : number;

  constructor(
    private workspaceService : WorkSpaceService,
    private snackBar : MatSnackBar,
    private artifactManager : ArtifactManagerService
  ) { }

  ngOnInit() {
  }

  public authorizePasswordForArtifact(password : string)
  {
    this.workspaceService.authorizePasswordForArtifact(this.workspaceReference,password,this.artifactID)
    .subscribe((response : HttpResponse<Object>)=>{
      const status = response.status
      const goodStatus = 200;
      if (status == goodStatus)
      {
        // Add the artifact to service to be realized by other components
        this.artifactManager.addAuthorizedArtifact({
          artifactID : this.artifactID
        })
        this.snackBar.open("You Now Have Access To The Documents of This Artfact","Okay")
      }
    },(error : any)=>{
      const status = error.status
      const unauthorizedStatus = 401
      if (status === unauthorizedStatus)
        this.snackBar.open("You Don't Have Access To This Document","Okay")
      else  
        this.snackBar.open("It Looks Like Something Went Wrong","Okay")
    })
  }
}
