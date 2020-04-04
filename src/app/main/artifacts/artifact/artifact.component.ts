import { Component, OnInit } from '@angular/core';
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { Artifact } from 'src/app/models/artifacts';
import { ActivatedRoute } from '@angular/router';
import { ADocument } from 'src/app/models/adocument';

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
  constructor(private artServ:ArtifactsService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.getArtifact();
    let doc = { doc_id : 1, comment : "SOO", version : "Hello", user_id : 2, data : null, data_modified : "", date_uploaded: "", art_id : 1}

    this.documents = [
      doc,
      doc
    ]
  }

  getArtifact()
  {
    let artID = this.route.snapshot.paramMap.get('id');
    let $artID = parseInt(artID);
    this.artServ.getArtifactFromID($artID)
    .subscribe((artifact)=>{
      this.artifact = artifact;
    })
  }

  public selectDocument(document:any)
  {
    this.docSelected = true;
    this.selectedDocument = document;
  }
}
