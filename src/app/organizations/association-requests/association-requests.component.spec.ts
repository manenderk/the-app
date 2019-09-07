import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociationRequestsComponent } from './association-requests.component';

describe('AssociationRequestsComponent', () => {
  let component: AssociationRequestsComponent;
  let fixture: ComponentFixture<AssociationRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociationRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociationRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
