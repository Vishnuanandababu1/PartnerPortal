import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilageAllocationComponent } from './privilage-allocation.component';

describe('PrivilageAllocationComponent', () => {
  let component: PrivilageAllocationComponent;
  let fixture: ComponentFixture<PrivilageAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilageAllocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivilageAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
