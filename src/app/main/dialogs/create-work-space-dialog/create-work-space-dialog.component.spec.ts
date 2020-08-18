import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkSpaceDialogComponent } from './create-work-space-dialog.component';

describe('CreateWorkSpaceDialogComponent', () => {
  let component: CreateWorkSpaceDialogComponent;
  let fixture: ComponentFixture<CreateWorkSpaceDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkSpaceDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkSpaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
