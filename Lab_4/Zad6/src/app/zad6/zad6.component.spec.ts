import { zad6Component } from './zad6.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';

describe('CarComponent', () => {
  let component: zad6Component;
  let fixture: ComponentFixture<zad6Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ zad6Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(zad6Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
