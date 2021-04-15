import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./recover-password.component.css']
})
export class RecoverPasswordComponent implements OnInit {


  private code: string = "";
  public isProcessingRequest: boolean = false;
  public isRequestSent: boolean = false;
  public isPasswordVisible: boolean = false;
  public requestMessage: string = ""
  public finishedStatus: number = 0;

  constructor(
    private route: ActivatedRoute,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.code = params['code'];
    })
  }

  public togglePasswordVisibility() {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  public recoverPassword(newPassword: string) {
    this.isProcessingRequest = true;

    const okayStatus = 200;
    const invalidLink = 404;
    const passwordExists = 409

    this.userService.recoverPassword(this.code, newPassword)
      .subscribe((response: HttpResponse<Object>) => {
        this.isRequestSent = true;
        this.isProcessingRequest = false;
        
        if (response.status === okayStatus) {
          this.requestMessage = "New Password Successfully Set. You Can Now Login"
        } else if (response.status === invalidLink) {
          this.requestMessage = "This Link is Not Valid"
        } else if (response.status === passwordExists) {
          this.requestMessage = "This Password Already Exists. Sorry"
        }

        this.finishedStatus = response.status

      }, (error) => {

        this.isProcessingRequest = false
        this.isRequestSent = true;
        const status = error['status']
        if (status === invalidLink) {
          this.requestMessage = "This Link is Not Valid"
        } else if (status === passwordExists) {
          this.requestMessage = "This Password Already Exists. Sorry"
        }
        this.finishedStatus = status

      })
  }


}
