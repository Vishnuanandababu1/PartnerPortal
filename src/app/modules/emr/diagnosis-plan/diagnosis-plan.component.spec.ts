import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiagnosisPlanComponent } from './diagnosis-plan.component';

describe('DiagnosisPlanComponent', () => {
  let component: DiagnosisPlanComponent;
  let fixture: ComponentFixture<DiagnosisPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiagnosisPlanComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiagnosisPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
