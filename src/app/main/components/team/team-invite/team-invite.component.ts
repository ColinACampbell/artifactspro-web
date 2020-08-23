import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-team-invite',
  templateUrl: './team-invite.component.html',
  styleUrls: ['./team-invite.component.css']
})
export class TeamInviteComponent implements OnInit {

  constructor(
    private route : ActivatedRoute,
    private orgServ : OrganizationService,
    private userServ : UserService,
    private snackBar : MatSnackBar
  ) { }

  public accessCode : String;
  public organizationName:String;

  ngOnInit() {
    this.accessCode = this.route.snapshot.paramMap.get('id');
    this.orgServ.getOrganizyionFromAccessCode(this.accessCode)
    .subscribe((observer)=>{
      this.organizationName = observer['org_name'];
    })
  }

  // TODO : Fix this later
  public signUpUser(email:String,password:String)
  {
    //console.log(email,password);
    this.userServ.signup(email,password)
    .subscribe((data)=>{
      //console.log(data['message']);
      if (data['message'] === 'success')
      {
        this.orgServ.addUserToOganization(this.accessCode)
        .subscribe((observable)=>{
          console.log(observable)
          let message = observable['message'];
          if (message === 'success')
          {
            this.snackBar.open('You joined successfully. Please check your email to verify your account','Ok');
          }
        })
      }
    })
  }

}
