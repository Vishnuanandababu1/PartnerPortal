import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpoeServiceComponent } from './cpoe-service.component';

describe('CpoeServiceComponent', () => {
  let component: CpoeServiceComponent;
  let fixture: ComponentFixture<CpoeServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpoeServiceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpoeServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
