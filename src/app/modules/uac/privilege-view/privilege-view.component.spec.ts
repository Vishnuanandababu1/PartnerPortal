import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeViewComponent } from './privilege-view.component';

describe('PrivilegeViewComponent', () => {
  let component: PrivilegeViewComponent;
  let fixture: ComponentFixture<PrivilegeViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegeViewComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivilegeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
