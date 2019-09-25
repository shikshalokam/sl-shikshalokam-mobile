import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssesmentChartPage } from './assesment-chart.page';

describe('AssesmentChartPage', () => {
  let component: AssesmentChartPage;
  let fixture: ComponentFixture<AssesmentChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssesmentChartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssesmentChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
