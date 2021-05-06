import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { JWTService } from 'src/app/services/util/jwt.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private snackBar: MatSnackBar,
    private userServ:UserService,
    private router:Router,
    private jwtService: JWTService
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
      this.snackBar.open("Please enter a valid email","Okay");
      return
    }

    this.userServ.login(email,password).subscribe((response:HttpResponse<Object>)=>
    {
      let status = response.status

      if (status === 200)
      {
        const jwtToken = response.body['token']
        console.log(jwtToken)

        this.jwtService.setToken(jwtToken)
        this.router.navigate(['/app'])
      }
      else if (status === 401){
        this.snackBar.open("Looks like your email or password is incorrect","Okay");
      }
    },(err)=>{

      const status = err['status']
      const cantProcessInfo = 422;
      const wrongCredentials = 401;
      if (status == wrongCredentials)
        this.snackBar.open("Looks like your email or password is incorrect","Okay");
      else if (status == cantProcessInfo)
        this.snackBar.open("This account exists but doesn't belong to any organization","Okay")
    })
  }

}
