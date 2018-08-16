import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkpackEditComponent } from './workpack-edit.component';

describe('WorkpackEditComponent', () => {
  let component: WorkpackEditComponent;
  let fixture: ComponentFixture<WorkpackEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkpackEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkpackEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
