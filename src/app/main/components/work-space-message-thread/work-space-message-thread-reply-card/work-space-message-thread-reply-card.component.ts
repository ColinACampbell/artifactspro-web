import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-work-space-message-thread-reply-card',
  templateUrl: './work-space-message-thread-reply-card.component.html',
  styleUrls: ['./work-space-message-thread-reply-card.component.css']
})
export class WorkSpaceMessageThreadReplyCardComponent implements OnInit {

  @Input("workspacePostReply") workspacePostReply : WorkSpacePostReply

  constructor() { }

  ngOnInit() {

  }



}
