import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchemaTemplateListComponent } from './schema-template-list.component';

describe('SchemaTemplateListComponent', () => {
  let component: SchemaTemplateListComponent;
  let fixture: ComponentFixture<SchemaTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchemaTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchemaTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
