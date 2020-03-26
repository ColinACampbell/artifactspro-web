import { Component, OnInit } from '@angular/core';
import { OrganizationService } from 'src/app/services/organization.service';
import { Organization } from 'src/app/models/organization';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.css']
})
export class MainHeaderComponent implements OnInit {

  public organization : Organization = new Organization({});
  constructor(private orgServe:OrganizationService) { }

  ngOnInit() {
    this.getOrganization().then((data)=>
    {
      console.log(data);
      this.organization = new Organization(data);
    })
  }

  private getOrganization() : Promise<any>
  {
    return this.orgServe.getOrganization();
  }

}
