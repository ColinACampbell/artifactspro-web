import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav/drawer';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  private mainNavDrawer : MatDrawer

  public setMainNavDrawer(drawer : MatDrawer) 
  {
    this.mainNavDrawer = drawer
  }

  public toggleMainNavDrawer()
  {
    this.mainNavDrawer.toggle()
  }
}
