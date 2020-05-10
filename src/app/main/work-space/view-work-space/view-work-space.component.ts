import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view-work-space',
  templateUrl: './view-work-space.component.html',
  styleUrls: ['./view-work-space.component.css']
})
export class ViewWorkSpaceComponent implements OnInit {

  constructor(
    private router:Router
  ) { }

  ngOnInit() {
  }

  public goBack()
  {
    this.router.navigate(['/app'])
  }

}
