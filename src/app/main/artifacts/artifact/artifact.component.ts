import { Component, OnInit } from '@angular/core';
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { Artifact } from 'src/app/models/artifacts';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-artifact',
  templateUrl: './artifact.component.html',
  styleUrls: ['./artifact.component.css']
})
export class ArtifactComponent implements OnInit {

  public artifact:Artifact;
  constructor(private artServ:ArtifactsService,
    private route:ActivatedRoute) { }

  ngOnInit() {
    this.getArtifact();
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

}
