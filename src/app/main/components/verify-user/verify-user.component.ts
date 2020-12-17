import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  constructor(
    private router:Router,
    private route:ActivatedRoute,
    private userServ:UserService,
    private snackBar:MatSnackBar
  ) { }

  private verificationCode:String;
  public loginInProcess:boolean = false;

  ngOnInit() {
    let accessCode = this.route.snapshot.paramMap.get('id');
    this.verificationCode = accessCode;
  }

  public verifyAccount(firstName:String,lastName:String)
  {
    this.loginInProcess = true;
    this.userServ.verifyUser(firstName,lastName,this.verificationCode)
    .subscribe((response : HttpResponse<Object>)=>{
      let status = response.status
      this.loginInProcess = false;
      if (status === 409)
      {
        this.snackBar.open("Looks like This Account is already verified or doesn't exists",'Okay')
      } else if (status === 201)
      {
        const snackBarRef = this.snackBar.open('Verification Successful','Login');
        snackBarRef.onAction()
        .subscribe((_)=>{
          this.router.navigate(['/login']);
        })
      }
    })
  }
}
