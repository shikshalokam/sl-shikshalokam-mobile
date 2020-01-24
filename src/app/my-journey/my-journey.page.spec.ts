import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyJourneyPage } from './my-journey.page';

describe('MyJourneyPage', () => {
  let component: MyJourneyPage;
  let fixture: ComponentFixture<MyJourneyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyJourneyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyJourneyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
