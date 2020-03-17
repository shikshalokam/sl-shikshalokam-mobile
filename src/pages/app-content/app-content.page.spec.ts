import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppContentPage } from './app-content.page';

describe('AppContentPage', () => {
  let component: AppContentPage;
  let fixture: ComponentFixture<AppContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppContentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
