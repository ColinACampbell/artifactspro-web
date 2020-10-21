import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateWorkspaceThreadDialogComponent } from './create-workspace-thread-dialog.component';

describe('CreateWorkspaceThreadDialogComponent', () => {
  let component: CreateWorkspaceThreadDialogComponent;
  let fixture: ComponentFixture<CreateWorkspaceThreadDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateWorkspaceThreadDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateWorkspaceThreadDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
