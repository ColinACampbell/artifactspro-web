import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsdetailOverviewComponent } from './wsdetail-overview.component';

describe('WsdetailOverviewComponent', () => {
  let component: WsdetailOverviewComponent;
  let fixture: ComponentFixture<WsdetailOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsdetailOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsdetailOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
