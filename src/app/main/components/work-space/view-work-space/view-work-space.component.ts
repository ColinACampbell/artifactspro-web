import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { WorkSpace } from 'src/app/models/workspace';
import { MatDialog } from '@angular/material/dialog';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import { Location } from '@angular/common'
import { CreateMessageDialogComponent } from 'src/app/main/dialogs/workspace/create-message-dialog/create-message-dialog.component';
import { WorkpaceDetailsComponent } from 'src/app/main/dialogs/workspace/workspace-details/workpace-details.component';

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
    private dialog:MatDialog,
    private location: Location
  ) { }

  private workspaceID:number;
  public workspace:WorkSpace = null;
  public workspacePosts : WorkSpacePost[] = []

  public workspaceParticipantAsUser : WorkspaceParticipant

  // TODO : Fix the issue with this
  
  ngOnInit() {

    this.workspaceID = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
    //console.log( this.workspace.work_space_id || "WSID is not set yet")
    this.loadWorkspaceInfo();
    this.loadPosts()
    this.getUserAsWorkspaceParticipant()
    this.getUserAsWorkspaceParticipant()
    
  }

  public goBack()
  {
    this.location.back()
  }

  private loadWorkspaceInfo()
  {
    this.workspaceService.getWorkspaceInfo(this.workspaceID)
    this.workspaceService.principalWorkspaceObservable.
    subscribe((workspace:WorkSpace)=>{
      this.workspace = workspace
    })
  }

  public loadPosts()
  {
    this.workspaceService.getMessages(this.workspaceID)
    this.workspaceService.workspacePostsObservable
    .subscribe((workspacePosts : WorkSpacePost[])=>{
      this.workspacePosts = workspacePosts;
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

  public openWorkspaceDetailsDialog()
  {
    const workspaceID = this.workspaceID;
    this.dialog.open(WorkpaceDetailsComponent,
      {
        width: "95%",
        height: "80%",
        data : {
          workspaceID
        }
      })
  }  

  public getUserAsWorkspaceParticipant()
  {
    this.workspaceService.getParticipantAsCurrentUser(this.workspaceID)
    // Will Be accessible from anywhere else without issues
    this.workspaceService.workspaceUserAsParticipantObservable
    .subscribe((user : WorkspaceParticipant)=>{
      this.workspaceParticipantAsUser = user
    })
  }
}
