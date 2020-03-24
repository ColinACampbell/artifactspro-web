import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupActionComponent } from './signup-action.component';

describe('SignupActionComponent', () => {
  let component: SignupActionComponent;
  let fixture: ComponentFixture<SignupActionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupActionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
