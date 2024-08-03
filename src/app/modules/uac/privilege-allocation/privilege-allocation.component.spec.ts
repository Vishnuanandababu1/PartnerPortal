import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeAllocationComponent } from './privilege-allocation.component';

describe('PrivilegeAllocationComponent', () => {
  let component: PrivilegeAllocationComponent;
  let fixture: ComponentFixture<PrivilegeAllocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegeAllocationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivilegeAllocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
