import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowArtifactInfoDialogComponent } from './show-artifact-info-dialog.component';

describe('ShowArtifactInfoDialogComponent', () => {
  let component: ShowArtifactInfoDialogComponent;
  let fixture: ComponentFixture<ShowArtifactInfoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShowArtifactInfoDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowArtifactInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
