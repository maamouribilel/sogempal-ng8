import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Order3Component } from './order3.component';

describe('Order3Component', () => {
  let component: Order3Component;
  let fixture: ComponentFixture<Order3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Order3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Order3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
