import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VoteReportPage } from './vote-report.page';

describe('VoteReportPage', () => {
  let component: VoteReportPage;
  let fixture: ComponentFixture<VoteReportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoteReportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoteReportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
