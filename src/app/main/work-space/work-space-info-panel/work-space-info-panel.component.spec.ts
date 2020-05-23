import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSpaceInfoPanelComponent } from './work-space-info-panel.component';

describe('WorkSpaceInfoPanelComponent', () => {
  let component: WorkSpaceInfoPanelComponent;
  let fixture: ComponentFixture<WorkSpaceInfoPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkSpaceInfoPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSpaceInfoPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
