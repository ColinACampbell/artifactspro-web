import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { WorkSpace } from 'src/app/models/workspace';
import { Artifact } from 'src/app/models/artifacts';
import { MatDialog } from '@angular/material';
import { CreateWorkSpaceDialogComponent } from '../create-work-space-dialog/create-work-space-dialog.component';
import { CreateMessageDialogComponent } from '../create-message-dialog/create-message-dialog.component';

@Component({
  selector: 'app-view-work-space',
  templateUrl: './view-work-space.component.html',
  styleUrls: ['./view-work-space.component.css']
})
export class ViewWorkSpaceComponent implements OnInit {

  constructor(
    private router:Router,
    private activeRoute:ActivatedRoute,
    private workspaceService: WorkSpaceService,
    private dialog:MatDialog
  ) { }

  list = [1,2,3,4,5,6,7,8,3,4,5,6,7]

 
  private workspaceID:number;
  public workspace:WorkSpace = null;

  ngOnInit() {
    this.workspaceID = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
    this.loadWorkspaceInfo();
  }

  public goBack()
  {
    this.router.navigate(['/app'])
  }

  private loadWorkspaceInfo()
  {
    this.workspaceService.getWorkspaceInfo(this.workspaceID)
    .subscribe((workspace:WorkSpace)=>{
      this.workspace = workspace;
    })
  }

  public openCreateMessageDialog()
  {
    this.dialog.open(CreateMessageDialogComponent);
  }
  

}
