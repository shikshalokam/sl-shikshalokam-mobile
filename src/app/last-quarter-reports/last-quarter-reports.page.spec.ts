import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastQuarterReportsPage } from './last-quarter-reports.page';

describe('LastQuarterReportsPage', () => {
  let component: LastQuarterReportsPage;
  let fixture: ComponentFixture<LastQuarterReportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastQuarterReportsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastQuarterReportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
