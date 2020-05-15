import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSpaceMembersComponent } from './work-space-members.component';

describe('WorkSpaceMembersComponent', () => {
  let component: WorkSpaceMembersComponent;
  let fixture: ComponentFixture<WorkSpaceMembersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkSpaceMembersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSpaceMembersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
