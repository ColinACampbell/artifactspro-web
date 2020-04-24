import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-verify-user',
  templateUrl: './verify-user.component.html',
  styleUrls: ['./verify-user.component.css']
})
export class VerifyUserComponent implements OnInit {

  constructor(
    private route:ActivatedRoute,
  ) { }

  ngOnInit() {
    let accessCode = this.route.snapshot.paramMap.get('id');
    console.log(accessCode)
  }

  
}
