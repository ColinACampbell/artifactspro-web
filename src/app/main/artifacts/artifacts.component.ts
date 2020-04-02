import { Component, OnInit } from '@angular/core';
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { Artifact } from 'src/app/models/artifacts';
import { MatDialog } from '@angular/material';
import { CreateDialogComponent } from './create-dialog/create-dialog.component';

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

  constructor(private artServ:ArtifactsService,public dialog: MatDialog) { }

  ngOnInit() {
    this.getAllArtifacts();
  }

  public getAllArtifacts()
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

  public openDialog()
  {
    let dialogRef = this.dialog.open(CreateDialogComponent,
      {
        width: "400px"
      })
  }
  
}
