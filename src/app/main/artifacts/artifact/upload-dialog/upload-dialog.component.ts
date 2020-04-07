import { Component, OnInit, Inject } from '@angular/core';
import { ADocument } from 'src/app/models/adocument';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';



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

  public fileData : String | ArrayBuffer;
  public progress : any;

  constructor(
    public dialogRef: MatDialogRef<UploadDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private snackBar: MatSnackBar,
    private artServ: ArtifactsService,
    private docServ: DocumentService,
    private route : ActivatedRoute) { }
 


  public selectedFile:File = null;

  ngOnInit() {
  }

  public fileInputChange(event)
  {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile)

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
        console.log(reader.result);
        this.fileData = reader.result;
    };
  }

  closeDialog()
  {
    this.dialogRef.close();
  }

  removeFile()
  {
    this.selectedFile = null;
  }

  uploadFile(name:String,comment:String)
  {

    let artID = this.dialogData.art_id;
    console.log(artID);
    let date = new Date(this.selectedFile.lastModified); // place the time stamp in the date object's contructor
    let year = date.getFullYear();
    let day = date.getDate() + ""
    let month = date.getMonth() + "";

    // parse in full format dd/mm/yyyy instead of d/m/yyyy
    if(day.length === 1)
      day = "0"+day;
    
    if(month.length === 1)
      month = "0"+month;
    
    let lastModified = `${day}/${month}/${year}`;


    if (name.length === 0 || comment.length === 0)
    {
      this.snackBar.open("Input fields cannot be empty","Okay");
      return;
    }

    let document = {}

    document['version'] = name;
    document['comment'] = comment;
    document['data_modified'] = lastModified;
    document['date_uploaded'] = 'something here';
    document['data'] = this.fileData;
    document['file_type'] = this.selectedFile.type


    this.docServ.uploadDocument(artID,document)
    .subscribe((event:HttpEvent<any>)=>{
      console.log(event)
      this.progress = event.type;
    })
  }
}
