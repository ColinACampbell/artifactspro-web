import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private userService : UserService,
    private snackBar : MatSnackBar
  ) { }

  ngOnInit(): void {
    this.userService.getUserInfo()
    .subscribe((user:User)=>{
      this.user = user;
    })
  }

  public cancelEdit()
  {
    this.isEditable = !this.isEditable;
  }

  public makeFieldsEditable()
  {
    this.isEditable = !this.isEditable;
  }

  public saveChanges()
  {
    this.isEditable = !this.isEditable;
    const firstName = this.user.first_name;
    const lastName = this.user.last_name;
    this.userService.updateBasicUserInfo(firstName,lastName)
    .subscribe((response:HttpResponse<Object>)=>{
      const okayStatus = 200;
      if (response.status === okayStatus)
      {
        this.snackBar.open('Information Updated Successfully. Logout and login for changes to take effect','Okay')
      }
    })
  }

  // work on endpoint to update user email


}
