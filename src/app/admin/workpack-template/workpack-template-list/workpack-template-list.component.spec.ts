import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkpackTemplateListComponent } from './workpack-template-list.component';

describe('WorkpackTemplateListComponent', () => {
  let component: WorkpackTemplateListComponent;
  let fixture: ComponentFixture<WorkpackTemplateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkpackTemplateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkpackTemplateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
