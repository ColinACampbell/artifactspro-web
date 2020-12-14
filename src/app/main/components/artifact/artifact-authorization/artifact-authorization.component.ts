import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-artifact-authorization',
  templateUrl: './artifact-authorization.component.html',
  styleUrls: ['./artifact-authorization.component.css']
})
export class ArtifactAuthorizationComponent implements OnInit {


  @Input('responseMessage')
  public responseMessage : string
  @Input('workspaceRef')
  public workspaceReference : string = ''

  constructor() { }

  ngOnInit() {
  }

}
