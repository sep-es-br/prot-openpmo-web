import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanStructureComponent } from './plan-structure.component';

describe('PlanStructureComponent', () => {
  let component: PlanStructureComponent;
  let fixture: ComponentFixture<PlanStructureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanStructureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlanStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
