import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendDoseComponent } from './recommend-dose.component';

describe('RecommendDoseComponent', () => {
  let component: RecommendDoseComponent;
  let fixture: ComponentFixture<RecommendDoseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecommendDoseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecommendDoseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
