import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSpaceMessageThreadComponent } from './work-space-message-thread.component';

describe('WorkSpaceMessageThreadComponent', () => {
  let component: WorkSpaceMessageThreadComponent;
  let fixture: ComponentFixture<WorkSpaceMessageThreadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkSpaceMessageThreadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSpaceMessageThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
