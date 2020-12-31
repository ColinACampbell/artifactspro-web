import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WsdetailArtifactsComponent } from './wsdetail-artifacts.component';

describe('WsdetailArtifactsComponent', () => {
  let component: WsdetailArtifactsComponent;
  let fixture: ComponentFixture<WsdetailArtifactsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WsdetailArtifactsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WsdetailArtifactsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
