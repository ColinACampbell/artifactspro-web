import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeUserPermissionsDialogComponent } from './change-user-permissions-dialog.component';

describe('ChangeUserPermissionsDialogComponent', () => {
  let component: ChangeUserPermissionsDialogComponent;
  let fixture: ComponentFixture<ChangeUserPermissionsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeUserPermissionsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeUserPermissionsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
