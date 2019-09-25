import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Domain4Page } from './domain4.page';

describe('Domain4Page', () => {
  let component: Domain4Page;
  let fixture: ComponentFixture<Domain4Page>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Domain4Page ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Domain4Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
