import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsdetailParticipantsActionDialogComponent } from './wsdetail-participants-action-dialog.component';

describe('WsdetailParticipantsActionDialogComponent', () => {
  let component: WsdetailParticipantsActionDialogComponent;
  let fixture: ComponentFixture<WsdetailParticipantsActionDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsdetailParticipantsActionDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsdetailParticipantsActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
