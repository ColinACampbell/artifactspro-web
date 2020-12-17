import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material';
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
    console.log(this.mainNavDrawer)
    this.mainNavDrawer.toggle()
  }
}
