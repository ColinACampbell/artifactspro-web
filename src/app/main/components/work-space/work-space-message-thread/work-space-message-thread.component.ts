import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { MatDialog } from '@angular/material/dialog';
import { CreateWorkspaceThreadDialogComponent } from 'src/app/main/dialogs/workspace/create-workspace-thread-dialog/create-workspace-thread-dialog.component';
import { Location } from '@angular/common';
import { WorkSpacePost } from 'src/app/models/workspacePost';
import { WorkSpacePostReply } from 'src/app/models/workspacePostReply';
import { SocketService } from 'src/app/services/socket.service';

@Component({
  selector: 'app-work-space-message-thread',
  templateUrl: './work-space-message-thread.component.html',
  styleUrls: ['./work-space-message-thread.component.css']
})
export class WorkSpaceMessageThreadComponent implements OnInit {


  public workspaceID : number;
  private threadID : number; // thread is same as a message
  public workspacePost : WorkSpacePost;
  public workspacePostReplies : WorkSpacePostReply[]

  constructor(
    private activatedRoute : ActivatedRoute,
    private workspaceService : WorkSpaceService,
    private router : Router,
    private createReplyDialog : MatDialog,
    private location : Location,
    private socketService : SocketService,
  ) { }

  ngOnInit() {

    this.workspaceService.workspacePostRepliesObservable
    .subscribe((workspacePostReplies : WorkSpacePostReply[])=>{
      this.workspacePostReplies = workspacePostReplies
    })

    this.workspaceID = parseInt(this.activatedRoute.snapshot.paramMap.get("workspaceID"))
    this.threadID = parseInt(this.activatedRoute.snapshot.paramMap.get("messageID"));
    this.loadWorkspaceMessage()
    this.loadWorkspaceReplies()

    this.socketService.socket.emit('join_discussion_thread',this.threadID);
    this.socketService.socket.on('update_discussion_message_thread',(_)=>{
      console.log("Updated Message Thread")
      this.loadWorkspaceReplies();
    })
  }


  private loadWorkspaceMessage()
  {
    this.workspaceService.getWorkspacePost(this.workspaceID,this.threadID)
    .subscribe((workspacePost : WorkSpacePost)=>{
      this.workspacePost = workspacePost
    })
  }

  private loadWorkspaceReplies()
  {
    this.workspaceService.getWorkspacePostReplies(this.workspaceID,this.threadID)
    
  }

  public goBack()
  {
    this.location.back()
  }

  public openAddReplyToPostDialog()
  {
    this.createReplyDialog.open(CreateWorkspaceThreadDialogComponent,
      {
        width : "400px",
        height : "280px",
        data : this.workspacePost
      })
  }

}
