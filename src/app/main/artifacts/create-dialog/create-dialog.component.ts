import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { ArtifactsComponent } from '../artifacts.component';

// TODO Work on the interface;

interface DialogData
{
  name : String;
  content: String;
  dateCreatedString: String;
}

@Component({
  selector: 'app-create-dialog',
  templateUrl: './create-dialog.component.html',
  styleUrls: ['./create-dialog.component.css']
})


export class CreateDialogComponent implements OnInit {


  private fullDate : String;

  constructor(
    public dialogRef: MatDialogRef<CreateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private snackBar : MatSnackBar,
    private artServ:ArtifactsService) {}

    closeDialog(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

  onDate(date:Date)
  {

    if (date === null)
    {
      this.snackBar.open("Date Cannot be empty","Okay")
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


  createArtifact(name:String,description:String)
  {
    console.log(name);
    console.log(description);

    if (name === '' || description === '')
    {
      this.snackBar.open('None of the fields should be empty',"Okay");
      return;
    }    

    this.artServ.createArtifact(name,description,this.fullDate)
    .subscribe((data)=>{
      let message = data['message'];
      if (message === 'ok')
        this.snackBar.open('Created successfully','Okay');
      else
        this.snackBar.open('Looks like there is an internal error','Okay')
      this.artServ.getAllArtifacts();
    })
    // TODO : Foward user to a screen where they can create a document
  
  }

}
