import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListFeedComponent } from './list-feed.component';

describe('ListFeedComponent', () => {
  let component: ListFeedComponent;
  let fixture: ComponentFixture<ListFeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListFeedComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
