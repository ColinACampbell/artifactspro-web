import { Component, OnInit } from '@angular/core';
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { Artifact } from 'src/app/models/artifacts';

@Component({
  selector: 'app-add-artifact-dialog',
  templateUrl: './add-artifact-dialog.component.html',
  styleUrls: ['./add-artifact-dialog.component.css']
})
export class AddArtifactDialogComponent implements OnInit {


  public artifacts : Artifact[];

  constructor(
    private artifactsService: ArtifactsService
  ) { }

  ngOnInit() {
    this.initArtifacts()
  }


  private initArtifacts()
  {
    this.artifactsService.getAllArtifacts()
    .subscribe((artifacts : Artifact[])=>{
      this.artifacts = artifacts;
    })
  }
}
