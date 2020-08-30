import { Component, OnInit, Input } from '@angular/core';
import { UtilService } from 'src/app/services/util.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-message-card',
  templateUrl: './message-card.component.html',
  styleUrls: ['./message-card.component.css']
})
export class MessageCardComponent implements OnInit {

  constructor(
    private utilService : UtilService,
    public router : Router
  ) { }

  @Input('workspacePost') workspacePost : WorkSpacePost;

  ngOnInit() {
    //console.log(new Date().getTime());
    const postTime = parseInt(this.workspacePost.time)
    console.log(this.workspacePost.time);
    let postDate = new Date(postTime)
    console.log(postDate);

    let time = this.timeDifference(new Date().getTime,postDate);
  }

  timeDifference(current, previous) {

    var msPerMinute = 60 * 1000;
    var msPerHour = msPerMinute * 60;
    var msPerDay = msPerHour * 24;
    var msPerMonth = msPerDay * 30;
    var msPerYear = msPerDay * 365;

    var elapsed = current - previous;

    if (elapsed < msPerMinute) {
         return Math.round(elapsed/1000) + ' seconds ago';   
    }

    else if (elapsed < msPerHour) {
         return Math.round(elapsed/msPerMinute) + ' minutes ago';   
    }

    else if (elapsed < msPerDay ) {
         return Math.round(elapsed/msPerHour ) + ' hours ago';   
    }

    else if (elapsed < msPerMonth) {
        return 'approximately ' + Math.round(elapsed/msPerDay) + ' days ago';   
    }

    else if (elapsed < msPerYear) {
        return 'approximately ' + Math.round(elapsed/msPerMonth) + ' months ago';   
    }

    else {
        return 'approximately ' + Math.round(elapsed/msPerYear ) + ' years ago';   
    }
  }

  public goToMessageThread()
  {
    const workspaceID = this.workspacePost.work_space_id;
    const threadID = this.workspacePost.work_space_msg_id;
    this.router.navigate([`app/workspace/${workspaceID}/message/${threadID}`])
  }

}
