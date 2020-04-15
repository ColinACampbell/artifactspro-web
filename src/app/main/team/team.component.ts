import { Component, OnInit } from '@angular/core';
import { MemberService } from 'src/app/services/member.service';
import { PartialObserver } from 'rxjs';
import { Members } from 'src/app/models/members';

@Component({
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.css']
})
export class TeamComponent implements OnInit {

  public members:Members[];
   ELEMENT_DATA: any[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  
  ];

  displayedColumns: string[] = ['first_name', 'last_name', 'email', 'role'];
  dataSource = this.ELEMENT_DATA;
  
  constructor(private membersService:MemberService) { }

  ngOnInit() {
    this.getAllMembers();
  }

  private getAllMembers()
  {
    this.membersService.getAllMembers()
    .subscribe((members:Members[])=>{
      this.members = members;
      console.log(this.members)
    })
  }

}
