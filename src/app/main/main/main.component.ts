import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTabGroup } from '@angular/material';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor() { }

  public selectedTab :any;

  ngOnInit() {
    let selectedIndex = localStorage.selectedMainTabIndex || 0
    this.selectedTab = new FormControl(selectedIndex);
  }

  // Persist the value of the tab index
  public setTabValue(index:number) {
    localStorage.selectedMainTabIndex = index
    this.selectedTab.setValue(index);
  }

}
