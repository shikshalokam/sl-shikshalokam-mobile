import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Domain2Page } from './domain2.page';

describe('Domain2Page', () => {
  let component: Domain2Page;
  let fixture: ComponentFixture<Domain2Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Domain2Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Domain2Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
