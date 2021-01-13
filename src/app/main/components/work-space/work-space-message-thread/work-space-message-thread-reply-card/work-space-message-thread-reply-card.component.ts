import { Component, OnInit, Input } from '@angular/core';
import { WorkSpacePostReply } from 'src/app/models/workspacePostReply';
import { UtilService } from 'src/app/services/util.service';

@Component({
  selector: 'app-work-space-message-thread-reply-card',
  templateUrl: './work-space-message-thread-reply-card.component.html',
  styleUrls: ['./work-space-message-thread-reply-card.component.css']
})
export class WorkSpaceMessageThreadReplyCardComponent implements OnInit {

  @Input("workspacePostReply") workspacePostReply : WorkSpacePostReply
  public timeLapse : String;
  constructor(
    private utilService : UtilService,
  ) { }

  ngOnInit() {
    const timeAgo = this.workspacePostReply.timestamp;
    const timeNow = new Date().getTime();
    this.timeLapse = this.utilService.timeDifference(timeNow,timeAgo);
  }



}
