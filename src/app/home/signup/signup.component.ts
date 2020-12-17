import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userServ:UserService,private router : Router,private snackBar:MatSnackBar) { }

  private password:String;
  private email:String;

  ngOnInit() {
  }

  signup(email:string,password:string)
  {
    if (this.password === '' || this.email === '')
    {
      this.snackBar.open("None of the fields can be empty","Okay")
      return;
    }

    if (!this.userServ.isEmailValid(email))
    {
      this.snackBar.open("Please enter a valid email","Okay")
      return
    }

    this.userServ.signup(email,password)
    .subscribe((response : HttpResponse<Object>)=>
    {  
      let status = response.status;

      if (status === 201)
      {
        let snackBarRef = this.snackBar.open("Sign Up Success","Next");
        snackBarRef.onAction().subscribe(()=>{
          this.router.navigate(['/signup/action'])
        })
      }
      else if (status === 409) {
        this.snackBar.open("It seems this email already exists","Okay");
      }
    },(err)=>{
      console.log(err)
    })
  }
}
