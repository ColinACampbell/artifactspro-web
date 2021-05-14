import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { OrganizationService } from 'src/app/services/organization.service';
import { UserService } from 'src/app/services/user.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpResponse } from '@angular/common/http';
import { JWTService } from 'src/app/services/util/jwt.service';
import { BillingService } from 'src/app/services/billing.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-team-invite',
  templateUrl: './team-invite.component.html',
  styleUrls: ['./team-invite.component.css']
})
export class TeamInviteComponent implements OnInit {

  private conflictStatus = 409;
  private createdStatus = 201;
  private okayStatus = 200;
  private unauthorizedStatus = 401

  constructor(
    private route: ActivatedRoute,
    private orgServ: OrganizationService,
    private userServ: UserService,
    private snackBar: MatSnackBar,
    private router: Router,
    private jwtService: JWTService,
    private billingService: BillingService
  ) { }

  public accessCode: string;
  public organizationName: string;
  public inProcess: Boolean = false;

  ngOnInit() {
    this.accessCode = this.route.snapshot.paramMap.get('id');
    this.orgServ.getOrganizyionFromAccessCode(this.accessCode)
      .subscribe((observer) => {
        this.organizationName = observer['org_name'];
      })
  }


  private addUserToOrg(accessCode: string, token) {

    this.jwtService.setToken(token);
    this.orgServ.addUserToOganization(accessCode)
      .subscribe((response: HttpResponse<Object>) => {

        let status = response.status;
        if (status === this.createdStatus) {
          const token2 = response.body['token']
          this.jwtService.setToken(token2);
          let snackBarRef = this.snackBar.open('You have joined successfully. Please check your email to verify your account if you are new', 'Ok');
          snackBarRef.onAction()
            .subscribe(() => {
              this.router.navigate(['/app'])
            })

        }
      })
  }

  // TODO : Fix this later
  public signUpUser(email: String, password: String) {

    this.billingService.verifyOrgCapacity(this.accessCode)
      .subscribe((response: HttpResponse<Object>) => {

        this.inProcess = true;
        this.userServ.signup(email, password)
          .subscribe((response: HttpResponse<Object>) => {
            this.inProcess = false;
            let status = response.status
            if (status === this.createdStatus) {
              const token = response.body['token']
              this.addUserToOrg(this.accessCode, token)
            }
          }, (error) => {
            //this.inProcess = false
            const status = error['status']

            if (status === this.conflictStatus) {
              // if the user already has an account, we should log them in
              this.userServ.login(email, password, null)
                .subscribe((response: HttpResponse<Object>) => {
                  this.inProcess = false;
                  if (response.status == this.okayStatus) {
                    const token = response.body['token']
                    this.addUserToOrg(this.accessCode, token);
                  }
                },(err)=>{
                  this.inProcess = false
                  if (err['status'] === this.unauthorizedStatus)
                    this.snackBar.open('Email or password in incorrect','Okay')
                })
            }
            //this.snackBar.open("An account for this email already exists","Okay")
          })

      }, (error) => {
        console.log(error)
        this.snackBar.open("Cannot join organization. The User limit has been reached", "Okay")
      })
  }



}
