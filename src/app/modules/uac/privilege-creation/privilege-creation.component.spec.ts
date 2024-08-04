import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrivilegeCreationComponent } from './privilege-creation.component';

describe('PrivilegeCreationComponent', () => {
  let component: PrivilegeCreationComponent;
  let fixture: ComponentFixture<PrivilegeCreationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PrivilegeCreationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrivilegeCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
