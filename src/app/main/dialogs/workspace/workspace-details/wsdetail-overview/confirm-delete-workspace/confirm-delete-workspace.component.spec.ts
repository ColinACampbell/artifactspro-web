import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmDeleteWorkspaceComponent } from './confirm-delete-workspace.component';

describe('ConfirmDeleteWorkspaceComponent', () => {
  let component: ConfirmDeleteWorkspaceComponent;
  let fixture: ComponentFixture<ConfirmDeleteWorkspaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConfirmDeleteWorkspaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConfirmDeleteWorkspaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
