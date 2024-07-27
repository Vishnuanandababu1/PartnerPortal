import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpoePharmacyComponent } from './cpoe-pharmacy.component';

describe('CpoePharmacyComponent', () => {
  let component: CpoePharmacyComponent;
  let fixture: ComponentFixture<CpoePharmacyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpoePharmacyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpoePharmacyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
