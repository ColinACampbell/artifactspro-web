import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserInfoOrganizationComponent } from './user-info-organization.component';

describe('UserInfoOrganizationComponent', () => {
  let component: UserInfoOrganizationComponent;
  let fixture: ComponentFixture<UserInfoOrganizationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserInfoOrganizationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserInfoOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
