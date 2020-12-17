import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar'
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { Router } from '@angular/router';
import { UtilService } from 'src/app/services/util.service';

// TODO Work on the interface;

interface DialogData {
  name: String;
  content: String;
  dateCreatedString: String;
}

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})

export class CreateDialogComponent implements OnInit {

  private fullDate: String;

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar: MatSnackBar,
    private artServ: ArtifactsService,
    private router : Router,
    private utilServ:UtilService) { }

  closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  createArtifact(name: String, description: String) {

    if (name === '' || description === '') {
      this.snackBar.open('None of the fields should be empty', "Okay");
      return;
    }

    let currentDate = this.utilServ.getCurrentDate();
    
    this.artServ.createArtifact(name, description, currentDate)
      .subscribe((data) => {
        let artID = data.art_id;

        let message = data['message'];
        if (message === 'ok')
        {
          let snackBarRef = this.snackBar.open('Created successfully', 'Okay');
          snackBarRef.afterDismissed()
          .subscribe((data)=>{
            this.closeDialog();
            this.router.navigate(['/app/artifact/',artID])
          })

          this.artServ.getAllArtifacts()
        }
        else
          this.snackBar.open('Looks like there is an internal error', 'Okay')
      })
  }

}
