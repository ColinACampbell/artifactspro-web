import { Component, OnInit } from '@angular/core';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { WorkSpace } from 'src/app/models/workspace';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import { CreateWorkSpaceDialogComponent } from '../../dialogs/workspace/create-work-space-dialog/create-work-space-dialog.component';

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.css']
})
export class WorkSpaceComponent implements OnInit {

  public workSpaces:WorkSpace[];
  public userAsMember : Member;

  constructor(
    private workSpaceService: WorkSpaceService,
    private memberService : MemberService,
    private createWSDialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadWorkSpaces();
    this.workSpaceService.workspacesObservable
    .subscribe((workSpaces:WorkSpace[])=>{
      this.workSpaces = workSpaces;
    });

    // Get The Member to restrict controls they might have over this workspace
    this.memberService.getMemberAsUser()
    .subscribe((member : Member)=>{
      this.userAsMember = member
    })
  }

  private loadWorkSpaces()
  {
    this.workSpaceService.getWorkSpaces()
    
  }

  public openCreateWorkSpaceDialog()
  {
    this.createWSDialog.open(CreateWorkSpaceDialogComponent);
  }

  public openWorkSpace(workSpace:WorkSpace)
  {
    let workSpaceID = workSpace.work_space_id;
    this.router.navigate(['/app/workspace/',workSpaceID]);
  }

  public nameSearch(event:Event)
  {
    const key = event.target['value']
    this.workSpaceService.nameSearch(key)
  }
}
