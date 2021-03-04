import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-info-personal',
  templateUrl: './user-info-personal.component.html',
  styleUrls: ['./user-info-personal.component.css']
})
export class UserInfoPersonalComponent implements OnInit {


  public user : User;
  public isEditable: boolean;

  constructor(
    private userService : UserService
  ) { }

  ngOnInit(): void {
    this.userService.getUserInfo()
    .subscribe((user:User)=>{
      this.user = user;
    })
  }

  public cancelEdit()
  {

  }

  public makeFieldsEditable()
  {
    this.isEditable = !this.isEditable;
  }

  public saveChanges()
  {
    // Work on send point to updating user name
    this.isEditable = !this.isEditable;
  }

  // work on endpoint to update user email


}
