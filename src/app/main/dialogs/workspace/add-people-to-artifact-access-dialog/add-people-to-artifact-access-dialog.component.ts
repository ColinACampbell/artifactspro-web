import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Member } from 'src/app/models/member';
import { WorkspaceManagerService } from 'src/app/services/util/workspace-manager.service';
import { WorkSpaceService } from 'src/app/services/work-space.service';

interface AccessUser {
  email : string,
  permission : string,
}

// TODO : Work on getting email from the workspace to add user to access the aritifact
@Component({
  selector: 'app-add-people-to-artifact-access-dialog',
  templateUrl: './add-people-to-artifact-access-dialog.component.html',
  styleUrls: ['./add-people-to-artifact-access-dialog.component.css']
})
export class AddPeopleToArtifactAccessDialogComponent implements OnInit {

  myControl = new FormControl();
  //options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;
  emailOptions:any[];

  public generalState = null;
  public selectedPermission : string;
  public usersList : any[] = JSON.parse(localStorage.getItem('usersList')) || []

  private existingMembers : Member[] = []
  public modalTitle : String = "";
  
  constructor(
    //private dialogRef:MatDialogRef<WorkSpaceAddMemberComponent>,
    private workspaceService:WorkSpaceService,
    @Inject(MAT_DIALOG_DATA) private dialogData: any,
    private snackBar:MatSnackBar,
    private dialog : MatDialogRef<AddPeopleToArtifactAccessDialogComponent>,
    private workspaceManager : WorkspaceManagerService,
  ) { }

  ngOnInit() {

    // Check the reference 
    if (this.dialogData.reference === 'wsdetail-artifacts-component')
    {
      this.generalState = "update-artifact-details"
      this.usersList = this.dialogData.accessUsers
    }

    this.modalTitle = this.generalState === "update-artifact-details" ? "Who Can Access" : "Add People"
    
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );

    this.workspaceService.membersObservable
    .subscribe((members:Member[])=>{
      this.existingMembers = members
    })
  }

  private _filter(value: any): any[] {
    const filterValue = value.email.toLowerCase();

    return this.emailOptions.filter(option => option.email.toLowerCase().indexOf(filterValue) === 0);
  }

  search(event:any)
  {
    let email = event.target.value;

    this.workspaceService.suggestEmailForUserInWorkspace(this.dialogData.workspaceID,email)
    .subscribe((observable:any[])=>{
      this.emailOptions = observable;
    })
  }

  public addPerson(email:string)
  {
    const person = {
      email,
      permissions : this.selectedPermission,
    }

    // Check if the user already exists in the array
    if (!this.usersList.some(user=>user.email == email) && this.existingMembers.some((member)=>member.email == email))
    {
      this.usersList.push(person)
      localStorage.setItem('usersList',JSON.stringify(this.usersList))
      //console.log(localStorage)
    }
    else 
      this.snackBar.open("This user is already in the list","Okay")

  }

  public removeUser(email:string)
  {
    this.usersList = this.usersList.filter((user)=>{
      return user.email != email
    })
    localStorage.setItem('usersList',JSON.stringify(this.usersList))
  }

  public closeDialog()
  {
    //localStorage.setItem('usersList',JSON.stringify(this.usersList))
    this.dialog.close()
  }

  public finish()
  {
    
    //this.usersList = [];
    if (this.generalState !== "update-artifact-details")
    {
      localStorage.setItem('usersList',JSON.stringify(this.usersList))
      this.workspaceManager.updateUsersToAddToArtifactAccess(this.usersList);
    }

    this.closeDialog()
  }
}
