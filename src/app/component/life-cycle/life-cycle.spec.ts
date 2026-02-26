import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeCycle } from './life-cycle';

describe('LifeCycle', () => {
  let component: LifeCycle;
  let fixture: ComponentFixture<LifeCycle>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LifeCycle]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LifeCycle);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
