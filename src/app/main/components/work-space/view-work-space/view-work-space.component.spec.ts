import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewWorkSpaceComponent } from './view-work-space.component';

describe('ViewWorkSpaceComponent', () => {
  let component: ViewWorkSpaceComponent;
  let fixture: ComponentFixture<ViewWorkSpaceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewWorkSpaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewWorkSpaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
