import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckboxControlComponent } from './checkbox-control.component';

describe('CheckboxControlComponent', () => {
  let component: CheckboxControlComponent;
  let fixture: ComponentFixture<CheckboxControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CheckboxControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CheckboxControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
