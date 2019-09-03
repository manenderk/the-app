import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListOrganizationComponent } from './list-organization.component';

describe('ListOrganizationComponent', () => {
  let component: ListOrganizationComponent;
  let fixture: ComponentFixture<ListOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
