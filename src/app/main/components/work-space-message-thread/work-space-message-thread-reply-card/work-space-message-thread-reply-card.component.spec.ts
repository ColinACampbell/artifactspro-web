import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkSpaceMessageThreadReplyCardComponent } from './work-space-message-thread-reply-card.component';

describe('WorkSpaceMessageThreadReplyCardComponent', () => {
  let component: WorkSpaceMessageThreadReplyCardComponent;
  let fixture: ComponentFixture<WorkSpaceMessageThreadReplyCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkSpaceMessageThreadReplyCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkSpaceMessageThreadReplyCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
