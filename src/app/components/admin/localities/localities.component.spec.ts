import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalitiesComponent } from './localities.component';

describe('LocalitiesComponent', () => {
  let component: LocalitiesComponent;
  let fixture: ComponentFixture<LocalitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
