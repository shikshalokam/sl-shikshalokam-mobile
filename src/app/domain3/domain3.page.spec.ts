import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Domain3Page } from './domain3.page';

describe('Domain3Page', () => {
  let component: Domain3Page;
  let fixture: ComponentFixture<Domain3Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Domain3Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Domain3Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
