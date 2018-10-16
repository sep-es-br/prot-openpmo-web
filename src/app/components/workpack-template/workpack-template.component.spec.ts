import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkpackTemplateComponent } from './workpack-template.component';

describe('WorkpackTemplateComponent', () => {
  let component: WorkpackTemplateComponent;
  let fixture: ComponentFixture<WorkpackTemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkpackTemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkpackTemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
