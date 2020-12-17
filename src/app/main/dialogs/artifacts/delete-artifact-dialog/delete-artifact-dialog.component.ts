import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef,  } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar"
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delete-artifact-dialog',
  templateUrl: './delete-artifact-dialog.component.html',
  styleUrls: ['./delete-artifact-dialog.component.css']
})
export class DeleteArtifactDialogComponent implements OnInit {

  constructor(
    private dialogRef:MatDialogRef<DeleteArtifactDialogComponent>,
    private artServ:ArtifactsService,
    private router: Router,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public dialogData: any
  ) { }

  public isNameCorrect:Boolean = false;
  private artifactName:String;
  private artID: number;

  ngOnInit() {
    this.artifactName = this.dialogData.artifact_name;
    this.artID = this.dialogData.art_id;
  }

  public onType(artifactName)
  {
    if (this.artifactName === artifactName)
      this.isNameCorrect = true
    else
      this.isNameCorrect = false;
  }

  public deleteArtifact()
  {
    this.artServ.deleteArtifact(this.artID)
    .subscribe((observable)=>{
      const message = observable['message'];
      if (message === 'done')
      {
        const snackBarRef = this.snackBar.open(`The Artifact '${this.artifactName}' was deleted`,'Okay');
        snackBarRef.afterDismissed()
        .subscribe((_)=>{
          this.dialogRef.close();
          this.router.navigate(['/app'])
        })
      } else
      {
        this.snackBar.open('Looks like something went wrong')
      }
    });
  }

  public closeDialog()
  {
    this.dialogRef.close()
  }
}
