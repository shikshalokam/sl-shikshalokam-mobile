import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LearningChartPage } from './learning-chart.page';

describe('LearningChartPage', () => {
  let component: LearningChartPage;
  let fixture: ComponentFixture<LearningChartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LearningChartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LearningChartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
