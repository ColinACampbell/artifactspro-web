import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-add-artifact-dialog',
  templateUrl: './add-artifact-dialog.component.html',
  styleUrls: ['./add-artifact-dialog.component.css']
})
export class AddArtifactDialogComponent implements OnInit {

  public artifacts : any[] = [];
  public myControl = new FormControl();
  filteredOptions: Observable<string[]>;

  constructor(
    private workspaceService: WorkSpaceService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any
  ) { }

  // TODO : Work on fixing this error [formControl]="myControl"
  ngOnInit() {
    this.initArtifacts()
    this.filteredOptions = this.myControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
    this.filteredOptions.subscribe((observer)=>{
      console.log(observer)
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
}
