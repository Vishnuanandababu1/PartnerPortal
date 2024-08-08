import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarControlComponent } from './calendar-control.component';

describe('CalendarControlComponent', () => {
  let component: CalendarControlComponent;
  let fixture: ComponentFixture<CalendarControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CalendarControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalendarControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
