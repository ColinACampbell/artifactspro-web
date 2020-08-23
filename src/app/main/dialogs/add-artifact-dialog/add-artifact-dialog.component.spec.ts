import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArtifactDialogComponent } from './add-artifact-dialog.component';

describe('AddArtifactDialogComponent', () => {
  let component: AddArtifactDialogComponent;
  let fixture: ComponentFixture<AddArtifactDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArtifactDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArtifactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
