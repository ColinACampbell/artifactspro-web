import { Component, OnInit, Input, Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { HttpResponse } from '@angular/common/http';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-work-space-add-member',
  templateUrl: './work-space-add-member.component.html',
  styleUrls: ['./work-space-add-member.component.css']
})
export class WorkSpaceAddMemberComponent implements OnInit {

  myControl = new FormControl();
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  emailOptions:any[];

  constructor(
    private dialogRef:MatDialogRef<WorkSpaceAddMemberComponent>,
    private workspaceService:WorkSpaceService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private snackBar:MatSnackBar
  ) { }

  ngOnInit() {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
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

  closeDialog()
  {
    this.dialogRef.close();
  }

  addToWorkspace(email:string)
  {
    const workspaceID = this.dialogData.workspaceID;
    this.workspaceService.addMember(workspaceID,email)
    .subscribe((response:HttpResponse<Object>)=>{

      if (response.status === 201)
      {
        const snackBarRef = this.snackBar.open("Member added to workspace","Okay");
        snackBarRef.afterDismissed()
        .subscribe((_)=>{
          this.workspaceService.getMembers(workspaceID)
          this.dialogRef.close();
        })
        
      } else 
      {
        this.snackBar.open("Member exsits","Okay")
      }
    })
    
  }
}
