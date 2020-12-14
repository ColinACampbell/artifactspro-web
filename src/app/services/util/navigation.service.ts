import { Injectable } from '@angular/core';
import { MatDrawer } from '@angular/material';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  constructor() { }

  private mainNavDrawer = new BehaviorSubject<MatDrawer>(null)
  public mainNavDrawerObservable = this.mainNavDrawer.asObservable();

  public setMainNavDrawer(drawer : MatDrawer) 
  {
    this.mainNavDrawer.next(drawer)
  }

  public toggleMainNavDrawer()
  {
    this.mainNavDrawerObservable.subscribe((drawer:MatDrawer)=>{
      drawer.toggle()
    })
  }
}
