import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-artifacts',
  templateUrl: './artifacts.component.html',
  styleUrls: ['./artifacts.component.css']
})
export class ArtifactsComponent implements OnInit {

  public artifacts = [
    { name: "Caribbean Studies SBA", art_id: 1},
    { name: "Physics Lab", art_id: 1},
    { name: "Analytics", art_id: 1},
    { name: "PSD Designs", art_id: 1},
    { name: "Sample Paragraphs", art_id: 1},
    { name: "Invoices", art_id: 1},
    { name: "2020 Revision", art_id: 1},

  ]
  constructor() { }

  ngOnInit() {
  }

}
