import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Member } from 'src/app/models/member';
import { MemberService } from 'src/app/services/member.service';
import {MatPaginator} from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-chat-contacts-dialog',
  templateUrl: './chat-contacts-dialog.component.html',
  styleUrls: ['./chat-contacts-dialog.component.css']
})
export class ChatContactsDialogComponent implements OnInit, AfterViewInit {


  public members : Member[];
  public displayedColumns: string[] = ['name', 'email', 'action'];
  public dataSource : MatTableDataSource<Member>;
  @ViewChild(MatPaginator,null) paginator: MatPaginator;
  

  constructor(
    private membersService : MemberService
  ) { }

  ngOnInit() {

    this.dataSource = new MatTableDataSource<Member>(this.members);

    this.membersService.getAllMembers()
    this.membersService.membersObservable.
    subscribe((members : Member[])=>{
      this.members = members;
    })
  }

  ngAfterViewInit()
  {
    this.dataSource.paginator = this.paginator
  }

}
