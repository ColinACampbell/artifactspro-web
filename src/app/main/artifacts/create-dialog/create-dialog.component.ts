import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { ArtifactsComponent } from '../artifacts.component';
import { ActivatedRoute, Router } from '@angular/router';

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
    private router : Router) { }

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

    const date = new Date();
    let day = date.getDate() + '';
    let month = date.getMonth() + 1 + ''; // convert them to string by contacenating them to a string

    // convert the values to double digits if the are not
    if (day.length === 1)
      day = "0" + day;

    if (month.length === 1)
      month = "0" + month;

    let year = date.getFullYear();
    let fullDate = `${day}/${month}/${year}`;
    console.log(fullDate);

    this.artServ.createArtifact(name, description, fullDate)
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
        }
        else
          this.snackBar.open('Looks like there is an internal error', 'Okay')
      })
  }

}
