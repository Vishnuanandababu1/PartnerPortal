import { CommonModule } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'toaster',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './toaster.component.html',
  styleUrl: './toaster.component.scss'
})
export class ToasterComponent {
  @Input() message!: string;
  @Input() type!: string;
  @Input() position!: string;
  @Input() customClass!: string;
  title: boolean = false;
  showToaster: boolean = false;

  constructor() { }

  ngOnInit() {
    this.showToaster = true;
    setTimeout(() => {
      this.showToaster = false;
    }, 3000);
  }
}
