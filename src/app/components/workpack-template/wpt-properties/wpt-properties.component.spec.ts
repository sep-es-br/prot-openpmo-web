import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WptPropertiesComponent } from './wpt-properties.component';

describe('WptPropertiesComponent', () => {
  let component: WptPropertiesComponent;
  let fixture: ComponentFixture<WptPropertiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WptPropertiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WptPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
