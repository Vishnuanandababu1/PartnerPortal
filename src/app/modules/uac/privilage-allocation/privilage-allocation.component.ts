import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { InputControlComponent } from '../../../shared/controls/input-control/input-control.component';
import { SelectControlComponent } from '../../../shared/controls/select-control/select-control.component';


@Component({
  selector: 'app-privilage-allocation',
  standalone: true,
  imports: [CommonModule, InputControlComponent, SelectControlComponent],
  templateUrl: './privilage-allocation.component.html',
  styleUrl: './privilage-allocation.component.scss'
})
export class PrivilageAllocationComponent {

}
