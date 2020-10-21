import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChatContactsDialogComponent } from './chat-contacts-dialog.component';

describe('ChatContactsDialogComponent', () => {
  let component: ChatContactsDialogComponent;
  let fixture: ComponentFixture<ChatContactsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChatContactsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChatContactsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
