import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BodhDashboardPage } from './bodh-dashboard.page';

describe('BodhDashboardPage', () => {
  let component: BodhDashboardPage;
  let fixture: ComponentFixture<BodhDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BodhDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BodhDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
