import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkpaceDetailsComponent } from './workpace-details.component';

describe('WorkpaceDetailsComponent', () => {
  let component: WorkpaceDetailsComponent;
  let fixture: ComponentFixture<WorkpaceDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkpaceDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkpaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
