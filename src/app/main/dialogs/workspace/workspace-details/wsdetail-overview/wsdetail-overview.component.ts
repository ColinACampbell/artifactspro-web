import { Component, Input, OnInit } from '@angular/core';
import { WorkSpace } from 'src/app/models/workspace';
import { WorkSpaceService } from 'src/app/services/work-space.service';

@Component({
  selector: 'app-wsdetail-overview',
  templateUrl: './wsdetail-overview.component.html',
  styleUrls: ['./wsdetail-overview.component.css']
})
export class WsdetailOverviewComponent implements OnInit {

  @Input('workspace') public workspace : WorkSpace;
 
  public fieldsEditable : Boolean = false;

  constructor(
    private workspaceService : WorkSpaceService
  ) { }

  ngOnInit() {
    this.workspaceService.getWorkspaceInfo(this.workspace.work_space_id);
    this.workspaceService.principalWorkspaceObservable
    .subscribe((workspace:WorkSpace)=>{
      this.workspace = workspace;
    })
  }

  saveEdit()
  {
    this.workspaceService.updateWorkspaceInfo(
      this.workspace.work_space_id,
      this.workspace.work_space_name,
      this.workspace.work_space_description
    )
    this.fieldsEditable = false
  }

  makeFieldsEditable()
  {
    console.log(!this.fieldsEditable)
    this.fieldsEditable = this.fieldsEditable ? false : true
  }

  cancelEdit()
  {
    this.fieldsEditable = false;
    this.workspaceService.getWorkspaceInfo(this.workspace.work_space_id);
  }

}
