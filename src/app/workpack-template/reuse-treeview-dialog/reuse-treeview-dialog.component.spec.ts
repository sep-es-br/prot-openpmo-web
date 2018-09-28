import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReuseTreeviewDialogComponent } from './reuse-treeview-dialog.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

describe('ReuseTreeviewDialogComponent', () => {
  let component: ReuseTreeviewDialogComponent;
  let fixture: ComponentFixture<ReuseTreeviewDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReuseTreeviewDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReuseTreeviewDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
