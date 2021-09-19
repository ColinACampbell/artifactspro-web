import { SelectionModel } from '@angular/cdk/collections';
import { HttpResponse } from '@angular/common/http';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Organization } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization.service';
import { UserService } from 'src/app/services/user.service';
import { JWTService } from 'src/app/services/util/jwt.service';
import { NavigationService } from 'src/app/services/util/navigation.service';

interface LinkToPage
{
  label : string,
  routerLink : string,
  icon : string
}

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit{

  public isReadyToSwitchOrg : boolean = false
  public links : LinkToPage[] = [
    {
      label: "Artifacts",
      routerLink: "/app",
      icon: "folder"
    },
    {
      label: "Workspaces",
      routerLink: "my-workspaces",
      icon: "work"
    },
    {
      label : "WorkFlows",
      routerLink: "my-workflows",
      icon: "account_tree"
    },
    {
      label: "Team",
      routerLink: "my-team",
      icon: "groups"
    }
  ]

  constructor(
    private navigationService : NavigationService,
    private organizationService: OrganizationService,
    private userService: UserService,
    private router: Router,
    private snackBar: MatSnackBar,
    private jwtService: JWTService
  ) { }

  @ViewChild('drawer',{static : true}) public mainNavDrawer : MatDrawer
  //@ViewChild("drawerLinks", {static: true}) private drawerLinks: MatSelectionList;

  public selectedTab :any;
  public showFiller : boolean = true
  public organization : Organization;
  public organizations : Organization[];
  public chosenOrganization: Organization;
  public fullYear : number = new Date().getFullYear()

  ngOnInit() {
    let selectedIndex = localStorage.selectedMainTabIndex || 0
    this.selectedTab = new FormControl(selectedIndex);
    this.getOrganization()
  }

  ngAfterViewInit()
  {
    this.navigationService.setMainNavDrawer(this.mainNavDrawer)
  }

  private getOrganizations()
  {
    this.organizationService.getOrganizations()
    .subscribe((organizations : Organization[])=>{
      // Filter out the current organization where ever it is
      this.organizations = organizations.filter(organization => organization.org_id !== this.organization.org_id)
    })
  }

  private getOrganization()
  {
    this.organizationService.getOrganization()
    .subscribe(( organization : Organization)=>
    {
      this.organization = organization
      this.getOrganizations();
    },(error)=>{
      console.log(error)
      const status = error['status']
      const nonProcessisble = 422;
      // Check if the user belongs to an organization
      if (status === nonProcessisble)
      {
        this.snackBar.open("You don't belong to any organization, do you want to create one ?","Yes")
        .onAction()
        .subscribe(()=>{
          this.router.navigate(['/signup/action'])
        })
      }

    });
  }

  public switchOrganizations(event:any)
  {
    const orgID = event['value']
    this.organizationService.currentOrganizationID = orgID;
    this.organizationService.switchOrganization(orgID)
    .subscribe((response:HttpResponse<Object>)=>{
      const okayStatus = 200
      if (response.status === okayStatus)
      {
        const token = response.body['token']
        this.jwtService.setToken(token)
        location.reload()
      } 
    })
  }

  // Persist the value of the tab index
  public setTabValue(index:number) {
    
    localStorage.selectedMainTabIndex = index
    this.selectedTab.setValue(index);
  }

  public toggle()
  {
    this.mainNavDrawer.toggle()
  }

  public toggleSwitchOrganization()
  {
    this.isReadyToSwitchOrg = !this.isReadyToSwitchOrg
  }
}
