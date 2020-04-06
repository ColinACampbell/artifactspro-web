import { Component, OnInit, Inject } from '@angular/core';
import { CreateDialogComponent } from '../../create-dialog/create-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { Router } from '@angular/router';



interface DialogData {
  name: String;
  content: String;
  dateCreatedString: String;
}

@Component({
  selector: 'app-upload-dialog',
  templateUrl: './upload-dialog.component.html',
  styleUrls: ['./upload-dialog.component.css']
})


export class UploadDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private artServ: ArtifactsService,
    private router : Router) { }
 
  ngOnInit() {
  }

  public fileInputChange(event)
  {
    let file = event.target.files[0];
    console.log(file)
  }

  closeDialog()
  {
    this.dialogRef.close();
  }
}
