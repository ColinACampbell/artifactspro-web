import { Component, OnInit } from '@angular/core';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { WorkSpace } from 'src/app/models/workspace';
import { ADocument } from 'src/app/models/adocument';
import { MatDialog } from '@angular/material';
import { CreateWorkSpaceDialogComponent } from './create-work-space-dialog/create-work-space-dialog.component';

@Component({
  selector: 'app-work-space',
  templateUrl: './work-space.component.html',
  styleUrls: ['./work-space.component.css']
})
export class WorkSpaceComponent implements OnInit {

  public workSpaces:WorkSpace[];

  constructor(
    private workSpaceService: WorkSpaceService,
    private createWSDialog: MatDialog
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

}
