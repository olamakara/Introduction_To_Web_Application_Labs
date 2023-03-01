import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripMenagerComponent } from './trip-menager.component';

describe('TripMenagerComponent', () => {
  let component: TripMenagerComponent;
  let fixture: ComponentFixture<TripMenagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TripMenagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TripMenagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
