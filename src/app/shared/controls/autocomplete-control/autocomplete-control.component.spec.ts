import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutocompleteControlComponent } from './autocomplete-control.component';

describe('AutocompleteControlComponent', () => {
  let component: AutocompleteControlComponent;
  let fixture: ComponentFixture<AutocompleteControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AutocompleteControlComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AutocompleteControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
