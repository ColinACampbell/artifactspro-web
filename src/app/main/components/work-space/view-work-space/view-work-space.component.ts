import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { WorkSpace } from 'src/app/models/workspace';
import { MatDialog } from '@angular/material';
import { CreateMessageDialogComponent } from './../../../dialogs/create-message-dialog/create-message-dialog.component';
import { AddArtifactDialogComponent } from 'src/app/main/dialogs/add-artifact-dialog/add-artifact-dialog.component';

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
  public workspacePosts : WorkSpacePost[] = []

  ngOnInit() {
    this.workspaceID = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
    this.loadWorkspaceInfo();

    this.workspaceService.workspacePostsObservable
    .subscribe((workspacePosts : WorkSpacePost[])=>{
      this.workspacePosts = workspacePosts;
    })

    this.loadPosts()
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
    const workspaceID = this.workspaceID
    this.dialog.open(CreateMessageDialogComponent,
      {
        width : "400px",
        data : {
          workspaceID
        }
      });
  }

  public loadPosts()
  {
    this.workspaceService.getMessages(this.workspaceID)
    
  }
}
