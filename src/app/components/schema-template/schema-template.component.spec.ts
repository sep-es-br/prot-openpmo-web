import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaTemplateComponent } from './schema-template.component';

describe('SchemaTemplateComponent', () => {
  let component: SchemaTemplateComponent;
  let fixture: ComponentFixture<SchemaTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
