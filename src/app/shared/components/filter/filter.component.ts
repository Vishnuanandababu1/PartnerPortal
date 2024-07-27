import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter',
  standalone: true,
  imports: [CommonModule],
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
}
