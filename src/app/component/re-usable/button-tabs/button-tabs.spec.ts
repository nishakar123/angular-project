import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonTabs } from './button-tabs';

describe('ButtonTabs', () => {
  let component: ButtonTabs;
  let fixture: ComponentFixture<ButtonTabs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ButtonTabs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonTabs);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
