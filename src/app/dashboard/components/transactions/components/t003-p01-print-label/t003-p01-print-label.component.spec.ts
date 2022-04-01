import { ComponentFixture, TestBed } from '@angular/core/testing';

import { T003P01PrintLabelComponent } from './t003-p01-print-label.component';

describe('T003P01PrintLabelComponent', () => {
  let component: T003P01PrintLabelComponent;
  let fixture: ComponentFixture<T003P01PrintLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ T003P01PrintLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(T003P01PrintLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
