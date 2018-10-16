import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OfficeAdminComponent } from './office-admin.component';

describe('OfficeAdminComponent', () => {
  let component: OfficeAdminComponent;
  let fixture: ComponentFixture<OfficeAdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OfficeAdminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OfficeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
