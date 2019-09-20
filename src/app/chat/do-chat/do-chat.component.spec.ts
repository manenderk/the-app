import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoChatComponent } from './do-chat.component';

describe('DoChatComponent', () => {
  let component: DoChatComponent;
  let fixture: ComponentFixture<DoChatComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoChatComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
