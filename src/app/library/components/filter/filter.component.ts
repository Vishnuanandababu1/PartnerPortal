import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule, ClickOutsideModule],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  @Input() customClass!: string;
  @Input() filterTitle!: string | undefined;
  @Output() closed = new EventEmitter<void>();

  closeFilter() {
    this.closed.emit();
  }

  onCloseFilter() {
    this.closed.emit();
  }
}
