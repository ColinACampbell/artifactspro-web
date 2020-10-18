import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private userServ:UserService,
    private router:Router
    ) { }

  ngOnInit() {
  }

  login(email:string,password:string)
  {
  
    if (password === '' || email === '')
    {
      this.snackBar.open("Please enter a your username and password",'Okay')
      return
    }

    if(!this.userServ.isEmailValid(email))
    {
      this.snackBar.open("Please enter a valid email");
      return
    }

    this.userServ.login(email,password).subscribe((response:HttpResponse<Object>)=>
    {
      let status = response.status

      if (status === 200)
      {
        this.router.navigate(['/app'])
      }
      else if (status === 401){
        this.snackBar.open("Looks like your email or password is incorrect","Okay");
      }
    },(err)=>{
      console.log(err)
      this.snackBar.open("Looks like your email or password is incorrect","Okay");
    })
  }

}
