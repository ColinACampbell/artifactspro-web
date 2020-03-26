import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';

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

    this.userServ.login(email,password).then((data)=>
    {
      let message = data['message'];
      console.log(data);
      if (message === 'success')
      {
        this.router.navigate(['/app'])
      }
      else {
        this.snackBar.open("Looks like your email or password is incorrect","Okay");
      }
    })
  }

}
