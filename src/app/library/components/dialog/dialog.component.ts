import { CommonModule } from '@angular/common';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'dialog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss'
})
export class DialogComponent {
  @Input() title!: string;
  @Input() type!: string;
  @Input() message!: string;
  @Input() customClass!: string;
  @Output() confirmClick = new EventEmitter();
  @Output() cancelClick = new EventEmitter();

  constructor() { }

  onClickContinue() {
    this.confirmClick.emit();
  }
  onClickCancel() {
    this.cancelClick.emit();
  }
}
