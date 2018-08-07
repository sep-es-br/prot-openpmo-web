import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkpackListComponent } from './workpack-list.component';

describe('WorkpackListComponent', () => {
  let component: WorkpackListComponent;
  let fixture: ComponentFixture<WorkpackListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkpackListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkpackListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
