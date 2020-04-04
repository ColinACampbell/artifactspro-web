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

  onDate(date: Date) {

    if (date === null) {
      this.snackBar.open("Date Cannot be empty", "Okay")
      return;
    }

    let day = date.getDate() + '';
    let month = date.getMonth() + ''; // convert them to string by contacenating them to a string

    // convert the values to double digits if the are not
    if (day.length === 1)
      day = "0" + day;

    if (month.length === 1)
      month = "0" + month;

    let year = date.getFullYear();
    let fullDate = `${month}/${day}/${year}`;
    this.fullDate = fullDate;
  }


  createArtifact(name: String, description: String) {
    console.log(name);
    console.log(description);

    if (name === '' || description === '' || this.fullDate === '') {
      this.snackBar.open('None of the fields should be empty', "Okay");
      return;
    }

    this.artServ.createArtifact(name, description, this.fullDate)
      .subscribe((data) => {
        let artID = data.art_id;
        console.log(artID);
        console.log(data);
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
    // TODO : Foward user to a screen where they can create a document

  }

}
