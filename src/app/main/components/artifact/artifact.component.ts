import { Component, OnInit } from '@angular/core';
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { Artifact } from 'src/app/models/artifacts';
import { ActivatedRoute, Router } from '@angular/router';
import { ADocument } from 'src/app/models/adocument';
import { DocumentService } from 'src/app/services/document.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar' 
import { Location } from '@angular/common';
import { DeleteArtifactDialogComponent } from '../../dialogs/artifacts/delete-artifact-dialog/delete-artifact-dialog.component';
import { UploadDialogComponent } from '../../dialogs/artifacts/upload-artifact-dialog/upload-dialog.component';
import { ArtifactManagerService } from 'src/app/services/util/artifact-manager.service';
import { DocumentSearchComponent } from './document-search/document-search.component';
import { ArtifactPermission } from 'src/app/models/artifactPermissionsts';
import { ShowArtifactInfoDialogComponent } from '../../dialogs/artifacts/show-artifact-info-dialog/show-artifact-info-dialog.component';

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
  public presentableFileSize : string;
  public isImage:boolean=false;
  public userForbidden: boolean = false;
  public responseMessage : string = undefined;

  public previewlink:String; // change this later

  public workspaceReference : string = ''
  public artID: number;

  public artifactPermission : string;
  public isPreviewShown : boolean = false;



  constructor(
    private artServ:ArtifactsService,
    private route:ActivatedRoute,
    private docServ: DocumentService,
    private uploadDialog: MatDialog,
    private deleteDialog: MatDialog,
    private searchDialog : MatDialog,
    private artifactInfoDialog : MatDialog,
    private _location: Location,
    private snackBar:MatSnackBar,
    public artifactManager : ArtifactManagerService
  ) { }

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

  openArtifactInfoDialog()
  {
    this.artifactInfoDialog.open(ShowArtifactInfoDialogComponent,{
      data : {
        artID : this.artID,
        workspaceReference : this.workspaceReference
      },
      width : "400px",
    })
  }

  // TODO Finish proper implementation later
  getArtifact(artID:number,workspaceReference:string)
  {
    
    
    this.artServ.getArtifactFromID(artID,workspaceReference).subscribe((artifact)=>{
      this.artServ.getPermissionForArtifact(artID,workspaceReference)
      .subscribe((artifactPermission : ArtifactPermission)=>{
        
        if (artifactPermission !== null)
          this.artifactPermission = artifactPermission.permissions
        else 
          this.artifactPermission = "Admin" // if it is null it implies the user owns it

        this.artifact = artifact;
      })
      
    },(response : any)=>{
      const forbidden = 401
      const message = undefined || response.error['message']; // Give it undefined if the user just don't have access
      this.artifact = response.error['artifact'];
      if (response.status === forbidden) 
      {
        this.userForbidden = true
        this.responseMessage = message
      }
    })
  }

  public selectDocument(document:ADocument)
  {
    this.docSelected = true;
    this.selectedDocument = document;
    let documentType = this.selectedDocument.type;

    let docID = this.selectedDocument.doc_id;

    this.presentableFileSize = this.assessFileSize(document.file_size)
    
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

  private assessFileSize(fileSize:number) : string
  {
    if ((fileSize / 1000) > 1000)
      return Math.floor(fileSize/1000000) + " Megabytes"
    else if (fileSize > 1000)
      return Math.floor(fileSize/1000) + " Kilobytes"
    
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
    // *ngIf="artifact || !this.userForbidden || this.artifactManager.hasAccessFromAuth(this.artID)"
  }

  openDocumentSearchDialog()
  {
    this.searchDialog.open(DocumentSearchComponent,
      {
        data : {
          artID : this.artID
        }
      })
  }

  public goBack()
  {
    this._location.back();
  }
}
