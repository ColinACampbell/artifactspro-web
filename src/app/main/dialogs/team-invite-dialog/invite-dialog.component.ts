import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.css']
})
export class InviteDialogComponent implements OnInit {

  private inviteUrl:String;
  constructor(
    public dialogRef: MatDialogRef<InviteDialogComponent>,
    private memServ: MemberService
  ) { }

  ngOnInit() {
    this.getInviteURL();
  }

  private getInviteURL()
  {
    this.memServ.getInviteURL()
    .subscribe((observable)=>{
      this.inviteUrl = observable['invite_url'];
    })
  }

  // TODO Work on cpy clipboard solution
  public closeDialog()
  {
    this.dialogRef.close();
  }


  public copyLinkToClipBoard(inputElement){
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
  }

}
