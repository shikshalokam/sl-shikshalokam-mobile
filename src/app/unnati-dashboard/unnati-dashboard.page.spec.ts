import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnnatiDashboardPage } from './unnati-dashboard.page';

describe('UnnatiDashboardPage', () => {
  let component: UnnatiDashboardPage;
  let fixture: ComponentFixture<UnnatiDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnnatiDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnnatiDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
