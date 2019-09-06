import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociateOrganizationComponent } from './associate-organization.component';

describe('AssociateOrganizationComponent', () => {
  let component: AssociateOrganizationComponent;
  let fixture: ComponentFixture<AssociateOrganizationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssociateOrganizationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssociateOrganizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
