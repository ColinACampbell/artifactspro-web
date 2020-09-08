import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material';
import { HttpResponse } from '@angular/common/http';

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
    private snackBar : MatSnackBar,
    private router : Router
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
    this.userServ.signup(email,password)
    .subscribe((response : HttpResponse<Object>)=>{
      let status = response.status
      if (status === 201)
      {
        this.orgServ.addUserToOganization(this.accessCode)
        .subscribe((response : HttpResponse<Object>)=>{

          let status = response.status;
          
          if (status === 201)
          {
            let snackBarRef = this.snackBar.open('You joined successfully. Please check your email to verify your account','Ok');
            snackBarRef.onAction()
            .subscribe(()=>{
              this.router.navigate(['/login'])
            })
  
          }
        })
      }
    })
  }

}
