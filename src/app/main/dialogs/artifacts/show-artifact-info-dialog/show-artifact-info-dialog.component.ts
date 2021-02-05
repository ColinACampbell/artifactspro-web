import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Artifact } from 'src/app/models/artifacts';
import { User } from 'src/app/models/user';
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-artifact-info-dialog',
  templateUrl: './show-artifact-info-dialog.component.html',
  styleUrls: ['./show-artifact-info-dialog.component.css']
})
export class ShowArtifactInfoDialogComponent implements OnInit {

  public artifact : Artifact;
  public isEditable : boolean = false;
  public user : User

  constructor(
    @Inject(MAT_DIALOG_DATA)  private data,
    private artifactService : ArtifactsService,
    private userService : UserService
  ) { }

  ngOnInit() {

    this.userService.getUserInfo()
    .subscribe((user : User)=>{
      this.user = user
    })

    this.artifactService.artifactObservable
    .subscribe((artifact : Artifact)=>{
      this.artifact = artifact
    })
  }

}
