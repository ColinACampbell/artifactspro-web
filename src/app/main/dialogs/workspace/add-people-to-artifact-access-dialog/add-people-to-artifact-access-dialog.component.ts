import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { WorkSpaceService } from 'src/app/services/work-space.service';

// TODO : Work on getting email from the workspace to add user to access the aritifact
@Component({
  selector: 'app-add-people-to-artifact-access-dialog',
  templateUrl: './add-people-to-artifact-access-dialog.component.html',
  styleUrls: ['./add-people-to-artifact-access-dialog.component.css']
})
export class AddPeopleToArtifactAccessDialogComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  emailOptions:any[];
  
  constructor(
    //private dialogRef:MatDialogRef<WorkSpaceAddMemberComponent>,
    private workspaceService:WorkSpaceService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
    console.log(this.dialogData);
  }

  private _filter(value: any): any[] {
    const filterValue = value.email.toLowerCase();

    return this.emailOptions.filter(option => option.email.toLowerCase().indexOf(filterValue) === 0);
  }

  search(event:any)
  {
    let email = event.target.value;

    this.workspaceService.emailSuggestion(email)
    .subscribe((observable:any[])=>{
      this.emailOptions = observable;
    })
  }
}
