import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSpaceAddMemberComponent } from './work-space-add-member.component';

describe('WorkSpaceAddMemberComponent', () => {
  let component: WorkSpaceAddMemberComponent;
  let fixture: ComponentFixture<WorkSpaceAddMemberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkSpaceAddMemberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSpaceAddMemberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
