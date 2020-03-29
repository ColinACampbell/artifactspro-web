import { Component, OnInit } from '@angular/core';
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { Artifact } from 'src/app/models/artifacts';

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.css']
})

export class ArtifactsComponent implements OnInit {

  public isInDocView:boolean = false;
  public artifacts:Artifact[];
  public selectedArtifact:Artifact;
  public isArtifactSelected: boolean = false;

  constructor(private artServ:ArtifactsService) { }

  ngOnInit() {
    this.getAllArtifacts();
  }

  private getAllArtifacts()
  {
    this.artServ.getAllArtifacts().subscribe(data => this.artifacts = data);
  }

  public selectArtifact(artifact:Artifact)
  {
    console.log(artifact);
    this.selectedArtifact = artifact;    
    this.isArtifactSelected = true;
  }

  public viewDetails(artifact)
  {
    this.isInDocView = true;
  }
}
