import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationByTypeComponent } from './reservation-by-type.component';

describe('ReservationByTypeComponent', () => {
  let component: ReservationByTypeComponent;
  let fixture: ComponentFixture<ReservationByTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservationByTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
