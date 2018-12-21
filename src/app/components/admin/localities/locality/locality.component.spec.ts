import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocalityComponent } from './locality.component';

describe('LocalityComponent', () => {
  let component: LocalityComponent;
  let fixture: ComponentFixture<LocalityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocalityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocalityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
