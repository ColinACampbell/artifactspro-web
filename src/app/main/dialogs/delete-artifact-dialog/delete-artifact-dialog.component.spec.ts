import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteArtifactDialogComponent } from './delete-artifact-dialog.component';

describe('DeleteArtifactDialogComponent', () => {
  let component: DeleteArtifactDialogComponent;
  let fixture: ComponentFixture<DeleteArtifactDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeleteArtifactDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteArtifactDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
