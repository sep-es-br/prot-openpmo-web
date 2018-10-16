import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PropertyTemplateComponent } from './property-template.component';

describe('PropertyTemplateComponent', () => {
  let component: PropertyTemplateComponent;
  let fixture: ComponentFixture<PropertyTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PropertyTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PropertyTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
