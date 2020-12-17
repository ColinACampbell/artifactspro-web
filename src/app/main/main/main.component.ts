import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav/public-api';
import { NavigationService } from 'src/app/services/util/navigation.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit, AfterViewInit{

  constructor(
    private navigationService : NavigationService
  ) { }

  @ViewChild('drawer',{static : true}) public mainNavDrawer : MatDrawer
  public selectedTab :any;
  public showFiller : boolean = true

  ngOnInit() {
    let selectedIndex = localStorage.selectedMainTabIndex || 0
    this.selectedTab = new FormControl(selectedIndex);
    
  }

  ngAfterViewInit()
  {
    console.log(this.mainNavDrawer)
    this.navigationService.setMainNavDrawer(this.mainNavDrawer)
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
