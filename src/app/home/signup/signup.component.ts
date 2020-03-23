import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private userServ:UserService) { }

  ngOnInit() {
  }

  login()
  {
    this.userServ.signup("foo","foo").then((data)=>
    {
      console.log(data);
    })
  }

}
