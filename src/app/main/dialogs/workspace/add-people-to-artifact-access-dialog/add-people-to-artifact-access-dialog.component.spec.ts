import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPeopleToArtifactAccessDialogComponent } from './add-people-to-artifact-access-dialog.component';

describe('AddPeopleToArtifactAccessDialogComponent', () => {
  let component: AddPeopleToArtifactAccessDialogComponent;
  let fixture: ComponentFixture<AddPeopleToArtifactAccessDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPeopleToArtifactAccessDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPeopleToArtifactAccessDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
