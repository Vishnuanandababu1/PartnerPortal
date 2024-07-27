import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpoeOrdersetComponent } from './cpoe-orderset.component';

describe('CpoeOrdersetComponent', () => {
  let component: CpoeOrdersetComponent;
  let fixture: ComponentFixture<CpoeOrdersetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CpoeOrdersetComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpoeOrdersetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
