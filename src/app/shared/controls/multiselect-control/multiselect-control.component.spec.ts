import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiselectControlComponent } from './multiselect-control.component';

describe('MultiselectControlComponent', () => {
  let component: MultiselectControlComponent;
  let fixture: ComponentFixture<MultiselectControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MultiselectControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MultiselectControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
