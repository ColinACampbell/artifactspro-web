import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';
import { WorkSpace } from 'src/app/models/workspace';
import { WorkSpaceService } from 'src/app/services/work-space.service';

@Component({
  selector: 'app-workpace-details',
  templateUrl: './workpace-details.component.html',
  styleUrls: ['./workpace-details.component.css']
})
export class WorkpaceDetailsComponent implements OnInit, AfterViewInit {

  showAccordions : Boolean = false;

  private workspaceID : number;
  public workspace : WorkSpace

  constructor(
    private workspaceService : WorkSpaceService,
    @Inject(MAT_DIALOG_DATA)  private dialogData: any
  ) { }

  ngOnInit() {
    this.workspaceID = this.dialogData.workspaceID;
    this.getWorkspaceInfo()
  }

  ngAfterViewInit(){
    this.showAccordions = true
  }

  public getWorkspaceInfo() 
  {
    //this.workspaceService.getWorkspaceInfo(this.workspaceID)
    this.workspaceService.principalWorkspaceObservable
    .subscribe((workspace: WorkSpace)=>{
      this.workspace = workspace
    })
  }

}
