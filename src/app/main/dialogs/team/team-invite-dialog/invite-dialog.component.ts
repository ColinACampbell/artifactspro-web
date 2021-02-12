import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { observable } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-invite-dialog',
  templateUrl: './invite-dialog.component.html',
  styleUrls: ['./invite-dialog.component.css']
})
export class InviteDialogComponent implements OnInit {

  public inviteUrl:String;
  constructor(
    public dialogRef: MatDialogRef<InviteDialogComponent>,
    private memServ: MemberService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit() {
    this.getInviteURL();
  }

  private getInviteURL()
  {
    this.memServ.getInviteURL()
    .subscribe((observable)=>{
      this.inviteUrl = observable['invite_url']; // change the way this is handled
      

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
    const ref = this.snackBar.open("Link Was Copied To Clip Board","Okay");
      ref.onAction()
      .subscribe((_)=>{
        this.dialogRef.close();
      })
  }

}
