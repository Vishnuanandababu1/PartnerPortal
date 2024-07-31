import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter, forwardRef, OnInit, OnDestroy } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor, FormControl } from '@angular/forms';
import { ClickOutsideModule } from 'ng-click-outside';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';


@Component({
  selector: 'select-control',
  standalone: true,
  imports: [CommonModule, ClickOutsideModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectControlComponent),
      multi: true,
    },
  ],
  templateUrl: './select-control.component.html',
  styleUrl: './select-control.component.scss'
})
export class SelectControlComponent implements ControlValueAccessor,OnInit,OnDestroy   {
  onSearch = new Subject<string>();
  keySearch:string='';
  @Input() title!: string;
  @Input() options: any = [];
  @Input() selectedItem: any;
  @Input() validation!: string;
  @Input() placeholder!: string;
  @Input() customClass!: string;
  @Input() noLabel: boolean = false;
  @Input() disabled: boolean = false;
  @Input() error: boolean = false; // New input for error state
  @Input() errorMessage: string = ''; // New input for error message
  @Input() validationClass: boolean = false;
  @Output() optionSelected = new EventEmitter<string>();
  filteredOptions: any[] = [];
  isDropdownOpen = false;
  highlightedIndex: number | null = null;
  private onChange: any = () => { };
  private onTouched: any = () => { };
  private subscription: Subscription = new Subscription();

  ngOnInit(){
    this.subscription=this.onSearch.pipe(debounceTime(1000),distinctUntilChanged()).subscribe(searchText=>{
          this.filterOptions(searchText);
          this.keySearch='';    
    })
  }
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
  writeValue(value: any): void {
    if (value !== undefined) {
      this.selectedItem = value;
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void { }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  openDropdown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'Enter') {
      this.toggleDropdown();
    }
  }
  hideDropdown() {
    setTimeout(() => {
      this.isDropdownOpen = false;
    }, 200);
  }

  selectOption(option: string) {
    this.selectedItem = option;
    this.isDropdownOpen = false;
    this.onChange(this.selectedItem);
    this.onTouched();
    this.optionSelected.emit(this.selectedItem);
  }

  resetSelection() {
    this.selectedItem = null;
    this.onChange(null);
    this.onTouched();
    this.isDropdownOpen = false;
  }

  selectListOutsideClick(e: Event) {
    this.isDropdownOpen = false;
  }

	/**
 * Handles keydown events for navigating and selecting options in the dropdown.
 * @param event The keyboard event.
 */
  onKeyDown(event: KeyboardEvent) {
    const isAlphabetOrNumberKey = /^[a-zA-Z0-9]$/.test(event.key);
    if (this.isDropdownOpen) {
      switch (event.key) {
        case 'ArrowDown':
          this.highlightNext();
          event.preventDefault();
          break;
        case 'ArrowUp':
          this.highlightPrevious();
          event.preventDefault();
          break;
        case 'Enter':
          if (this.highlightedIndex !== null) {
            this.selectOption(this.options[this.highlightedIndex]);
          }
          event.preventDefault();
          break;
        case 'Escape':
          this.isDropdownOpen = false;
          break;
        default:
          if (isAlphabetOrNumberKey) {
              this.keySearch+=event.key?.toString()
              if(this.keySearch!=''){
                this.onSearch.next(this.keySearch);
              }
          }
          break;
      }
    }
  }
/**
 * Filters and sorts options based on the provided value.
 * @param value The value to filter options by.
 */
  filterOptions(value: string) {
    const filterValue = value?.toLowerCase();
    this.filteredOptions = this.options
    .filter((option:string) => option?.toLowerCase()?.includes(filterValue))
    .sort((a:string, b:string) => {
      const aIndex = a.toLowerCase().indexOf(filterValue);
      const bIndex = b.toLowerCase().indexOf(filterValue);
      return aIndex - bIndex;
    });
    if (this.filteredOptions.length > 0) {
      const firstFilteredIndex = this.options?.indexOf(this.filteredOptions?.[0]);
      if(firstFilteredIndex>=0){
        this.highlightedIndex = firstFilteredIndex;
        if (this.highlightedIndex !== null) {
          this.selectOption(this.options[this.highlightedIndex]);
        }
      }
  
    }
  }
   /**
 * Highlights the next option in the dropdown list.
 * If the current highlight is at the end of the list or no item is highlighted,
 * the first item will be highlighted.
 */
  highlightNext() {
    if (this.highlightedIndex === null || this.highlightedIndex === this.options.length - 1) {
      this.highlightedIndex = 0;
    } else {
      this.highlightedIndex++;
    }
  }
 /**
 * Highlights the previous option in the dropdown list.
 * If the current highlight is at the beginning of the list or no item is highlighted,
 * the last item will be highlighted.
 */
  highlightPrevious() {
    if (this.highlightedIndex === null || this.highlightedIndex === 0) {
      this.highlightedIndex = this.options.length - 1;
    } else {
      this.highlightedIndex--;
    }
  }
}
