import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'artifactpro';

  constructor(private userServ:UserService,private router:Router)
  {

  }

  ngOnInit()
  {
    this.userServ.authUser()
  }

}
