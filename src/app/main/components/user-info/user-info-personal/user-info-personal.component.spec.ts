import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoPersonalComponent } from './user-info-personal.component';

describe('UserInfoPersonalComponent', () => {
  let component: UserInfoPersonalComponent;
  let fixture: ComponentFixture<UserInfoPersonalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoPersonalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoPersonalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
