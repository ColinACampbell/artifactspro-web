import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatSnackBar, MatDialogRef, MatDialog } from '@angular/material';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { HttpResponse } from '@angular/common/http';
import { AddPeopleToArtifactAccessDialogComponent } from '../add-people-to-artifact-access-dialog/add-people-to-artifact-access-dialog.component';
import { WorkspaceManagerService } from 'src/app/services/util/workspace-manager.service';

@Component({
  selector: 'app-add-artifact-dialog',
  templateUrl: './add-artifact-dialog.component.html',
  styleUrls: ['./add-artifact-dialog.component.css']
})
export class AddArtifactDialogComponent implements OnInit {

  public artifacts : any[] = [];
  public myControl = new FormControl();
  
  filteredOptions: Observable<string[]>;

  public isSecured : Boolean = false;
  public usersToAdd : any[] = [];
  public artifactPassword : string = ''

  constructor(
    private workspaceService: WorkSpaceService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private snackBar : MatSnackBar,
    private dialogRef : MatDialogRef<AddArtifactDialogComponent>,
    private matDialog : MatDialog,
    private workspaceManager : WorkspaceManagerService
  ) { }

  // TODO : Work on fixing this error [formControl]="myControl"
  ngOnInit() {
    this.initArtifacts()
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );

      // TODO : Remove this if needed
    this.filteredOptions.subscribe((observer)=>{
    })

    this.workspaceManager.usersToAddToArtifactAccessObservable
    .subscribe((users)=>{
      this.usersToAdd = users
    })

  }

  private _filter(value: any): any[] {
    console.log(value)
    const filterValue = value.toLowerCase();

    return this.artifacts.filter(option => option.name.toLowerCase().indexOf(filterValue) === 0);
  }

  // TODO Refractor these too methods
  public search(event:Event)
  {
    const artifactName = event.target['value']
    this.workspaceService.artifactsSuggestion(artifactName,this.dialogData.workspaceID)
    .subscribe((observable)=>{
      console.log(observable);
      this.artifacts = observable
    })
  }

  private initArtifacts()
  {
    const artifactName = ""
    this.workspaceService.artifactsSuggestion(artifactName,this.dialogData.workspaceID)
    .subscribe((observable)=>{
      console.log(observable);
      this.artifacts = observable
    })
  }

  public addArtifactToWorkSpace(artifactName:string,artifactPassword:string)
  {
    
    if (artifactName.length === 0)
    {
      this.snackBar.open("The Name of The Artifact Must Be Provided","Okay")
    }
    this.workspaceManager.clearUsersToAddToArtifactAccess()
    this.workspaceService.addArtifact(this.dialogData.workspaceID,artifactName,
      this.isSecured,artifactPassword,this.usersToAdd)
    .subscribe((response:HttpResponse<Object>)=>{
      if (response.status === 200)
        {
          this.workspaceService.getArtifacts(this.dialogData.workspaceID)
          this.snackBar.open("Artifact Was Added Successfully","Okay").onAction().subscribe(()=>{
            this.dialogRef.close()
          })
      }
      
    },(err)=>{
      const status = err.status
      if (status === 409)
      {
        this.snackBar.open("It Seems This Artifact Already Exists in This Workspace","Okay")
      }
      else if (status === 422)
        this.snackBar.open("Error, It Seems That Invalid Data Was Passed","Okay")
    })
  }

  public openAddPeopleDialog()
  {
    this.matDialog.open(AddPeopleToArtifactAccessDialogComponent,{
      width : "400px",
      data : {
        workspaceID : this.dialogData.workspaceID
      }
    })
  }

  public closeDialog()
  {
    this.dialogRef.close()
  }
}
