import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output  } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {
  @Input() header!: string;
  @Input() footer!: string;
  @Input() customClass!: string;
  @Input() modalTitle!: string | undefined;
  @Output() closed = new EventEmitter<void>();
  
  closeModal() {
    this.closed.emit();
  }
}
