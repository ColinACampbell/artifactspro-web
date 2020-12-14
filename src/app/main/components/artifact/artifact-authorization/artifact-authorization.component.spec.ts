import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtifactAuthorizationComponent } from './artifact-authorization.component';

describe('ArtifactAuthorizationComponent', () => {
  let component: ArtifactAuthorizationComponent;
  let fixture: ComponentFixture<ArtifactAuthorizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtifactAuthorizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtifactAuthorizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
