import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatListOption, MatSelectionList } from '@angular/material/list';
import { MatDrawer } from '@angular/material/sidenav';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Organization } from 'src/app/models/organization';
import { OrganizationService } from 'src/app/services/organization.service';
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
      label: "Team",
      routerLink: "my-team",
      icon: "groups"
    }
  ]

  constructor(
    private navigationService : NavigationService,
    private organizationService: OrganizationService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  @ViewChild('drawer',{static : true}) public mainNavDrawer : MatDrawer
  //@ViewChild("drawerLinks", {static: true}) private drawerLinks: MatSelectionList;

  public selectedTab :any;
  public showFiller : boolean = true
  public organization : Organization;
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


  private getOrganization()
  {
    this.organizationService.getOrganization()
    .subscribe(( organization : Organization)=>
    {
      this.organization = organization
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

  // Persist the value of the tab index
  public setTabValue(index:number) {
    
    localStorage.selectedMainTabIndex = index
    this.selectedTab.setValue(index);
  }

  public toggle()
  {
    this.mainNavDrawer.toggle()
  }
}
