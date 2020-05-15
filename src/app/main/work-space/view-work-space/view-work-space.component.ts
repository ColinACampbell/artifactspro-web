import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { WorkSpace } from 'src/app/models/workspace';

@Component({
  selector: 'app-view-work-space',
  templateUrl: './view-work-space.component.html',
  styleUrls: ['./view-work-space.component.css']
})
export class ViewWorkSpaceComponent implements OnInit {

  constructor(
    private router:Router,
    private activeRoute:ActivatedRoute,
    private workspaceService: WorkSpaceService,
  ) { }

  private workspaceID:number;
  private workspace:WorkSpace;

  ngOnInit() {
    this.workspaceID = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
    this.loadWorkspaceInfo();
  }

  public goBack()
  {
    this.router.navigate(['/app'])
  }

  private loadWorkspaceInfo()
  {
    this.workspaceService.getWorkspaceInfo(this.workspaceID)
    .subscribe((workspace:WorkSpace)=>{
      this.workspace = workspace;
    })
  }

}
