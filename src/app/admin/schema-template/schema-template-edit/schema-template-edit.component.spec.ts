import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaTemplateEditComponent } from './schema-template-edit.component';

describe('SchemaTemplateEditComponent', () => {
  let component: SchemaTemplateEditComponent;
  let fixture: ComponentFixture<SchemaTemplateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaTemplateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
