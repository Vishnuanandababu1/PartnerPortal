import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicineConfigurationComponent } from './medicine-configuration.component';

describe('MedicineConfigurationComponent', () => {
  let component: MedicineConfigurationComponent;
  let fixture: ComponentFixture<MedicineConfigurationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MedicineConfigurationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MedicineConfigurationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
