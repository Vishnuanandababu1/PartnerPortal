import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputControlComponent } from '../../../shared/controls/input-control/input-control.component';
import { SelectControlComponent } from '../../../shared/controls/select-control/select-control.component';

@Component({
  selector: 'app-privilege-view',
  standalone: true,
  imports: [CommonModule, InputControlComponent, SelectControlComponent],
  templateUrl: './privilege-view.component.html',
  styleUrl: './privilege-view.component.scss'
})
export class PrivilegeViewComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

  }

}
