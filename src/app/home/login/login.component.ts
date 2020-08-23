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

  constructor(private snackBar: MatSnackBar,private userServ:UserService,private router:Router) { }

  ngOnInit() {
  }

  login(email:String,password:String)
  {
    
    if (password === '' || email === '')
    {
      alert("None of the fields can be empty")
    }

    this.userServ.login(email,password).subscribe((response:HttpResponse<Object>)=>
    {
      console.log(response)
      let status = response.status

      if (status === 200)
      {
        this.router.navigate(['/app'])
      }
      else {
        this.snackBar.open("Looks like your email or password is incorrect","Okay");
      }
    },(err)=>{
      console.log(err)
    })
  }

}
