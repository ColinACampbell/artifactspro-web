import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { WorkSpaceService } from 'src/app/services/work-space.service';
import { WorkSpace } from 'src/app/models/workspace';
import { Artifact } from 'src/app/models/artifacts';

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
  public workspace:WorkSpace;
  public workspaceMembers:any[];
  public artifacts: Artifact[];

  ngOnInit() {
    this.workspaceID = parseInt(this.activeRoute.snapshot.paramMap.get('id'));
    this.loadWorkspaceInfo();
    this.loadMembers();
    this.loadArtifacts();
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

  private loadMembers()
  {
    this.workspaceService.getMembers(this.workspaceID)
    .subscribe(observer=>{
      this.workspaceMembers = observer;
      console.log(observer)
    })
  }

  private loadArtifacts()
  {
    this.workspaceService.getArtifacts(this.workspaceID)
    .subscribe((artiacts:Artifact[])=>{
      this.artifacts = artiacts;
      console.log(artiacts)
    })
  }

}
