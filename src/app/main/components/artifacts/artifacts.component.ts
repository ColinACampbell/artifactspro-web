import { Component, OnInit } from '@angular/core';
import { ArtifactsService } from 'src/app/services/artifacts.service';
import { Artifact } from 'src/app/models/artifacts';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CreateDialogComponent } from '../../dialogs/artifacts/create-artifact-dialog/create-dialog.component';
import { WorkSpaceService } from 'src/app/services/work-space.service';

interface IterableWorkspaceNames {
  work_space_name : string
}

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

  public selectedWorkspace : string = localStorage.selectedWorkspace ||'My Documents'
  public availableWorkspaces : string[] = ['My Documents']

  constructor(
    private artServ:ArtifactsService,
    private dialog: MatDialog,
    private router:Router,
    private workspaceService : WorkSpaceService
    ) { }

  ngOnInit() {
    
    this.artServ.artifactsObservable
    .subscribe((artifacts: Artifact[])=>{
      this.artifacts = artifacts;
    })

    this.getWorkspaceNames()
    this.getAllArtifacts();
  }


  public getWorkspaceNames()
  {
    this.workspaceService.getWorkspaceNames()
    .subscribe((names:any[])=>{
      names.forEach(( name : IterableWorkspaceNames )=>{
        this.availableWorkspaces.push(name.work_space_name)
      })
    })
  }

  public getAllArtifacts()
  {
    this.onSelectWorkspace()
  }

  public selectArtifact(artifact:Artifact)
  {
    this.selectedArtifact = artifact;    
    this.isArtifactSelected = true;
  }

  public viewDetails(artifact:Artifact)
  {
    let artID = artifact.art_id;
    this.router.navigate(['/app/artifact/',artID])
  }

  public openDialog()
  {
    this.dialog.open(CreateDialogComponent,
      {
        width: "400px"
      })
  }

  public searchArtifact(event:Event)
  {
    let key = event.target['value']
    
    if ( this.selectedWorkspace !== 'My Documents' ) 
    {
      this.artServ.workspaceSearch(key,this.selectedWorkspace)
    } else
    {
      this.artServ.nameSearch(key)
    }
  }
  
  public onSelectWorkspace()
  {
    console.log(this.selectedWorkspace)
    if ( this.selectedWorkspace !== 'My Documents' ) 
    {
      this.artServ.getAllArtifactsByWorkspace(this.selectedWorkspace)
    } else
    {
      this.artServ.getAllArtifacts();
    }
    localStorage.selectedWorkspace = this.selectedWorkspace
  }
}
