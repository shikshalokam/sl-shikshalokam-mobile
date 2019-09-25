import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Domain1Page } from './domain1.page';

describe('Domain1Page', () => {
  let component: Domain1Page;
  let fixture: ComponentFixture<Domain1Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Domain1Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Domain1Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
