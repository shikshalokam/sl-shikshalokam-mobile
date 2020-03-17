import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TopContentsPage } from './top-contents.page';

describe('TopContentsPage', () => {
  let component: TopContentsPage;
  let fixture: ComponentFixture<TopContentsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TopContentsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopContentsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
