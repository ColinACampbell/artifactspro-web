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

  public isProcessingRequest : boolean = false;
  public isRequestSent : boolean = false;

  ngOnInit(): void {
  }

  // This method is un tested
  public requestPassworRecovery(email:string)
  {
    this.isProcessingRequest = true;
    this.userService.requestPasswordRecovery(email)
    .subscribe((response : HttpResponse<Object>)=>{
      this.isProcessingRequest = false;
      
      const okayStatus = 200;
      const userNotFoundStatus = 404;
      if (response.status === okayStatus)
        this.isRequestSent = true; // make the ui visible for validation
      else if (response.status === userNotFoundStatus) 
        this.snackBar.open("Sorry, but this account is not valid","Okay")
    },(error)=>{
      this.isProcessingRequest = false;
      const badStatus = 500;
      if (error['status'] === badStatus)
        this.snackBar.open("Something went wrong, please try again","Okay")
    })
  }
}
