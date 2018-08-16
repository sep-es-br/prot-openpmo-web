import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkpackTemplateEditComponent } from './workpack-template-edit.component';

describe('WorkpackTemplateEditComponent', () => {
  let component: WorkpackTemplateEditComponent;
  let fixture: ComponentFixture<WorkpackTemplateEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkpackTemplateEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkpackTemplateEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
