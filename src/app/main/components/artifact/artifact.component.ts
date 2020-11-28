import { Component, OnInit } from '@angular/core';
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { Artifact } from 'src/app/models/artifacts';
import { ActivatedRoute, Router } from '@angular/router';
import { ADocument } from 'src/app/models/adocument';
import { DocumentService } from 'src/app/services/document.service';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { observable } from 'rxjs';
import { DeleteArtifactDialogComponent } from '../../dialogs/artifacts/delete-artifact-dialog/delete-artifact-dialog.component';
import { UploadDialogComponent } from '../../dialogs/artifacts/upload-artifact-dialog/upload-dialog.component';

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
  public isImage:boolean=false;

  public previewlink:String; // change this later

  private workspaceReference : string = ''

  constructor(
    private artServ:ArtifactsService,
    private route:ActivatedRoute,
    private docServ: DocumentService,
    private uploadDialog: MatDialog,
    private deleteDialog: MatDialog,
    private _location: Location,
    private snackBar:MatSnackBar
  ) { }

  private artID:number;
  ngOnInit() 
  {

    let artID = this.route.snapshot.paramMap.get('id');    
    this.artID = parseInt(artID);

    this.route.queryParams
    .subscribe((params)=>{
      this.workspaceReference = params.ref
    })

    this.getArtifact(this.artID,this.workspaceReference);
    this.getAllDocuments(this.artID);
    this.docServ.documentsObservable
    .subscribe((documents : ADocument[])=>{
      this.documents = documents;
    })

    
  }

  getArtifact(artID:number,workspaceReference:string)
  {
    this.artServ.getArtifactFromID(artID,workspaceReference)
    .subscribe((artifact)=>{
      this.artifact = artifact;
    })
  }

  public selectDocument(document:any)
  {
    this.docSelected = true;
    this.selectedDocument = document;
    let documentType = this.selectedDocument.type;

    let docID = this.selectedDocument.doc_id;
    
    // check if document is image
    if (documentType.split('/')[0] === 'image')
      this.isImage = true;
    else 
      this.isImage = false;

    this.docServ.providePreviewLink(this.artID,docID)
    .subscribe((response)=>{
      this.previewlink = response['download'];
    
      //let officeView = `https://view.officeapps.live.com/op/embed.aspx?src=${this.previewlink}`
      //this.sanitizer.bypassSecurityTrustResourceUrl(officeView)
    })
  }

  private getAllDocuments(artID:number)
  {
    this.docServ.getDocuments(artID)
  }

  public openUploadDialog()
  {
    let dialogRef = this.uploadDialog.open(UploadDialogComponent,
      {
        width: "400px",
        data : {
          art_id : this.artID
        }
      })
  }

  public openDeleteDialogue()
  {
    let dialogRef = this.deleteDialog.open(DeleteArtifactDialogComponent,
      {
        width : "480px",
        data : {
          artifact_name :  this.artifact.name,
          art_id : this.artID,
        }
      })
  }

  public deleteDocument(document:ADocument)
  {
    const id = document.doc_id;
    this.docServ.deleteDocument(id)
    .subscribe((observable)=>{
      const message = observable['message'];
      if (message === 'done')
        this.getAllDocuments(this.artID);
        this.snackBar.open(`Document '${document.version}' was deleted, successfully`,'Okay')
    });
  }

  public goBack()
  {
    this._location.back();
  }
}
