import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentService } from 'src/app/services/document.service';

@Component({
  selector: 'app-document-search',
  templateUrl: './document-search.component.html',
  styleUrls: ['./document-search.component.css']
})
export class DocumentSearchComponent implements OnInit {

  constructor(
    private documentService : DocumentService,
    @Inject(MAT_DIALOG_DATA) private dialogData,
    private dialogRef : MatDialogRef<DocumentSearchComponent>
  ) { }

  public documentName : string;
  public documentComments : string;

  ngOnInit(): void {
  }

  private search(documentName : string,documentComments : string)
  {
    this.documentService.searchDocuments(this.dialogData.artID,documentName,documentComments);
  }

  keyUpSearch()
  {
    this.search(this.documentName,this.documentComments)
  }

  closeDialog()
  {
    this.dialogRef.close()
  }
}
