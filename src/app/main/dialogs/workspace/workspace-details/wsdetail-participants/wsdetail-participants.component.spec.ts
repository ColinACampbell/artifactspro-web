import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsdetailParticipantsComponent } from './wsdetail-participants.component';

describe('WsdetailParticipantsComponent', () => {
  let component: WsdetailParticipantsComponent;
  let fixture: ComponentFixture<WsdetailParticipantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsdetailParticipantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsdetailParticipantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
