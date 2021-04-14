import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-request-forget-password',
  templateUrl: './request-forget-password.component.html',
  styleUrls: ['./request-forget-password.component.css']
})
export class RequestForgetPasswordComponent implements OnInit {

  constructor(
    private snackBar : MatSnackBar,
    private userService : UserService
  ) { }

  ngOnInit(): void {
  }

  // This method is un tested
  public requestPassworRecovery(email:string)
  {
    this.userService.requestPasswordRecovery(email)
    .subscribe((response : HttpResponse<Object>)=>{
      const okayStatus = 200;
      const userNotFoundStatus = 404;
      if (response.status === okayStatus)
        this.snackBar.open("An Email was sent, please check & follow the steps to recovery","Okay")
      else if (response.status === userNotFoundStatus) 
        this.snackBar.open("Sorry, but this account is not valid","Okay")
    })
  }
}
