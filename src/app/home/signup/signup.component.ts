import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';

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

  login(email:String,password:String)
  {
    this.password = password;
    this.email = email;
    if (this.password === '' || this.email === '')
    {
      alert("None of the fields can be empty")
    }

    this.userServ.signup(this.email,this.password).then((data)=>
    {
      let message = data['message'];
      if (message === 'success')
      {
        let snackBarRef = this.snackBar.open("Sign Up Success","Next");
        snackBarRef.onAction().subscribe(()=>{
          this.router.navigate(['/signup/action'])
        })
      }
      else {
        this.snackBar.open("It seems this email already exists","Okay");
      }
    })
  }
}
