import { Component, OnInit, Inject } from '@angular/core';
import { ADocument } from 'src/app/models/adocument';
import { MatDialogRef, MAT_DIALOG_DATA,  } from '@angular/material/dialog';
import { MatSnackBar } from "@angular/material/snack-bar"
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DocumentService } from 'src/app/services/document.service';
import { HttpEvent } from '@angular/common/http';

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
  public uploadProgress : number;
  public hasUploaded:boolean = false;

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

    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
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
    let lastModifiedDate = new Date(this.selectedFile.lastModified); // place the time stamp in the date object's contructor
    let lastModified = this.formatDate(lastModifiedDate);
    let uploadedDate = new Date();
    let dateUploaded = this.formatDate(uploadedDate);

    if (name.length === 0 || comment.length === 0)
    {
      this.snackBar.open("Input fields cannot be empty","Okay");
      return;
    }

    let document = {}

    document['version'] = name;
    document['comment'] = comment;
    document['date_modified'] = lastModified;
    document['date_uploaded'] = dateUploaded;
    document['data'] = this.fileData;
    document['file_type'] = this.selectedFile.type
    console.log("File Size : "+ this.selectedFile.size)
    document['fileSize'] = this.selectedFile.size;

    this.docServ.uploadDocument(artID,document)
    .subscribe((event:HttpEvent<any>)=>{

      let totalData = event['total'];
      let dataLoaded = event['loaded'];

      let message = event['statusText'];

      this.hasUploaded = true;

      if (message === 'OK')
      {
        this.docServ.getDocuments(this.dialogData.art_id)
        let snackbarRef = this.snackBar.open('Document uploaded successfuly','Okay',
        {
          duration : 5000
        });
        
        snackbarRef.onAction()
        .subscribe((_)=>{
          this.dialogRef.close();
        })
      }
      this.uploadProgress = (dataLoaded / totalData) * 100;
    })
  }

  private formatDate(date:Date) : String
  {
    let year = date.getFullYear();
    let day = date.getDate() + ""
    let month = (date.getMonth() + 1) + "";
    // parse in full format dd/mm/yyyy instead of d/m/yyyy
    if(day.length === 1)
      day = "0"+day;
    
    if(month.length === 1)
      month = "0"+month;
    
    return `${day}/${month}/${year}`;
  }
}
