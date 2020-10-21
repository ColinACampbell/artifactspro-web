import { AfterViewInit, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-workpace-details',
  templateUrl: './workpace-details.component.html',
  styleUrls: ['./workpace-details.component.css']
})
export class WorkpaceDetailsComponent implements OnInit, AfterViewInit {

  showAccordions : Boolean = false;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    this.showAccordions = true
  }

}
