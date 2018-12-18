import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrgRoleComponent } from './org-role.component';

describe('OrgRoleComponent', () => {
  let component: OrgRoleComponent;
  let fixture: ComponentFixture<OrgRoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrgRoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrgRoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
