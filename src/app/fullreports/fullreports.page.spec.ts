import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullreportsPage } from './fullreports.page';

describe('FullreportsPage', () => {
  let component: FullreportsPage;
  let fixture: ComponentFixture<FullreportsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullreportsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullreportsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
