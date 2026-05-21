import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Showreel } from './showreel';

describe('Showreel', () => {
  let component: Showreel;
  let fixture: ComponentFixture<Showreel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Showreel],
    }).compileComponents();

    fixture = TestBed.createComponent(Showreel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
