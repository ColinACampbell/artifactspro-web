import { HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private userService : UserService,
    private dialogRef : MatDialogRef<ShowArtifactInfoDialogComponent>,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {

    this.userService.getUserInfo()
    .subscribe((user : User)=>{
      this.user = user
    })

    this.artifactService.getArtifactFromID(this.data.artID,this.data.workspaceReference)
    .subscribe((artifact : Artifact)=>{
      this.artifact = artifact
    })
  }

  makeFieldsEditable()
  {
    this.isEditable = true
  }

  canceEdit()
  {
    this.isEditable = false
  }

  saveChanges()
  {
    // TODO : Fix this issue of subscribe not triggering
    this.artifactService.changeNameAndDescription(this.artifact.name,this.artifact.description,this.data.artID)
    .subscribe((response : HttpResponse<Object>)=>{
  
      if (response.status === 200)
      {
        this.isEditable = false
        const ref = this.snackBar.open("Changes Made Successfully","Okay");
        ref.onAction()
        .subscribe(()=>{
          this.dialogRef.close();
        })
      }
        
    },(err)=>{
      console.log(err)
    })

  }

}
