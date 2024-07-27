import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClinicalWarningComponent } from './clinical-warning.component';

describe('ClinicalWarningComponent', () => {
  let component: ClinicalWarningComponent;
  let fixture: ComponentFixture<ClinicalWarningComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClinicalWarningComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClinicalWarningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
