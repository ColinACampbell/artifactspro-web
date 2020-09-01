import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { WorkSpaceService } from 'src/app/services/work-space.service';

@Component({
  selector: 'app-work-space-message-thread',
  templateUrl: './work-space-message-thread.component.html',
  styleUrls: ['./work-space-message-thread.component.css']
})
export class WorkSpaceMessageThreadComponent implements OnInit {


  public workspaceID : number;
  private threadID : number; // thread is same as a message
  public workspacePost : WorkSpacePost;

  constructor(
    private activatedRoute : ActivatedRoute,
    private workspaceService : WorkSpaceService,
    private router : Router,
  ) { }

  ngOnInit() {
    this.workspaceID = parseInt(this.activatedRoute.snapshot.paramMap.get("workspaceID"))
    this.threadID = parseInt(this.activatedRoute.snapshot.paramMap.get("messageID"));
    this.loadWorkspaceMessage()
  }


  private loadWorkspaceMessage()
  {
    this.workspaceService.getWorkspacePost(this.workspaceID,this.threadID)
    .subscribe((workspacePost : WorkSpacePost)=>{
      this.workspacePost = workspacePost
    })
  }

  public goBack()
  {
    this.router.navigate([`app/workspace/${this.workspaceID}`])
  }

}
