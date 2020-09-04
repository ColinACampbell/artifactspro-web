import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
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

  signup(email:String,password:String)
  {
    if (this.password === '' || this.email === '')
    {
      alert("None of the fields can be empty")
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
