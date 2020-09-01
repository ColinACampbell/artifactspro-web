import { Component, OnInit } from '@angular/core';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { WorkSpace } from 'src/app/models/workspace';
import { MatDialog } from '@angular/material';
import { CreateWorkSpaceDialogComponent } from './../../dialogs/create-work-space-dialog/create-work-space-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.css']
})
export class WorkSpaceComponent implements OnInit {

  public workSpaces:WorkSpace[];

  constructor(
    private workSpaceService: WorkSpaceService,
    private createWSDialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadWorkSpaces();
  }

  private loadWorkSpaces()
  {
    this.workSpaceService.getWorkSpaces()
    .subscribe((workSpaces:WorkSpace[])=>{
      //console.log(workSpaces)
      this.workSpaces = workSpaces;
    });
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
}
