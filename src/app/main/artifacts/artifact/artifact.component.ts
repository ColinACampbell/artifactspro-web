import { Component, OnInit } from '@angular/core';
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { Artifact } from 'src/app/models/artifacts';
import { ActivatedRoute } from '@angular/router';
import { ADocument } from 'src/app/models/adocument';
import { DocumentService } from 'src/app/services/document.service';
import { MatDialog } from '@angular/material';
import { CreateDialogComponent } from '../create-dialog/create-dialog.component';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';

@Component({
  selector: 'app-artifact',
  templateUrl: './artifact.component.html',
  styleUrls: ['./artifact.component.css']
})
export class ArtifactComponent implements OnInit {

  public artifact:Artifact;
  public selectedDocument:ADocument = null;
  public documents:ADocument[];
  public docSelected:boolean = false;

  constructor(
    private artServ:ArtifactsService,
    private route:ActivatedRoute,
    private docServ: DocumentService,
    private dialog: MatDialog,
  ) { }

  private artID:number;
  ngOnInit() 
  {

    let artID = this.route.snapshot.paramMap.get('id');
    this.artID = parseInt(artID);

    this.getArtifact(this.artID);
    this.getAllDocuments(this.artID);

    //let doc = { doc_id : 1, comment : "SOO", version : "Hello", user_id : 2, data : null, data_modified : "", date_uploaded: "", art_id : 1}
  }

  getArtifact(artID:number)
  {
    this.artServ.getArtifactFromID(artID)
    .subscribe((artifact)=>{
      this.artifact = artifact;
    })
  }

  public selectDocument(document:any)
  {
    this.docSelected = true;
    this.selectedDocument = document;
  }

  private getAllDocuments(artID:number)
  {
    this.docServ.getDocuments(artID)
    .subscribe((documents:ADocument[])=>{
      this.documents = documents;
    });
  }

  public openUploadDialog()
  {
    let dialogRef = this.dialog.open(UploadDialogComponent,
      {
        width: "400px",
        data : {
          art_id : this.artID
        }
      })
  }
}
