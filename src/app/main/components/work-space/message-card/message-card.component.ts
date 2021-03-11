import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';
import { WorkSpacePost } from 'src/app/models/workspacePost';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.css']
})
export class MessageCardComponent implements OnInit {

  constructor(
    private utilService : UtilService,
    public router : Router,
  ) { }

  public timeLapse : String;

  @Input('workspacePost') workspacePost : WorkSpacePost;
  @Input('workspaceName') workspaceName : string;
  @Input('hideControls') hideControls : boolean = false

  public availableColors : string[] = ['red']

  ngOnInit() {
    const postTime = parseInt(this.workspacePost.time)
    let postDate = new Date(postTime)
    // TODO : Work on getting time difference
    this.timeLapse =  this.utilService.timeDifference(new Date().getTime(),postDate);
  }

  public goToMessageThread()
  {
    const workspaceID = this.workspacePost.work_space_id;
    const threadID = this.workspacePost.work_space_msg_id;
    this.router.navigate([`app/workspace/${workspaceID}/message/${threadID}`])
  }

  public viewDetails(artID:number)
  {
    // TODO : Work on getting the workspace name
    this.router.navigate(['/app/artifact/',artID],{queryParams : { ref : this.workspaceName  }})
  }
}
