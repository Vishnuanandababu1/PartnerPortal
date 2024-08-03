import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputControlComponent } from '../../../shared/controls/input-control/input-control.component';
import { SelectControlComponent } from '../../../shared/controls/select-control/select-control.component';
import { FilterComponent } from '../../../shared/components/filter/filter.component';


@Component({
  selector: 'app-privilage-allocation',
  standalone: true,
  imports: [CommonModule, InputControlComponent, SelectControlComponent, FilterComponent],
  templateUrl: './privilage-allocation.component.html',
  styleUrl: './privilage-allocation.component.scss'
})
export class PrivilageAllocationComponent implements OnInit {

  userRoles = [
    { id: 1, role: 'Administrator', levelId: '4', level: 'high', total: 5, images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png'] },

    { id: 2, role: 'Manager', total: 3, levelId: '3', level: 'medium', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-4.png', '../../../../images/avatars/user-5.png'] },
    { id: 3, role: 'Doctor', total: 7, levelId: '3', level: 'medium', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-4.png', '../../../../images/avatars/user-5.png', '../../../../images/avatars/user-6.png', '../../../../images/avatars/user-7.png'] },
    { id: 4, role: 'Nurse', total: 4, levelId: '2', level: 'low', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-4.png'] },
    { id: 5, role: 'Technician', total: 8, levelId: '2', level: 'low', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-5.png', '../../../../images/avatars/user-6.png', '../../../../images/avatars/user-7.png', '../../../../images/avatars/user-8.png', '../../../../images/avatars/user-9.png'] },
    { id: 6, role: 'Front Office', total: 6, levelId: '1', level: 'minor', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-4.png'] },
    { id: 7, role: 'Accountant', total: 2, levelId: '1', level: 'minor', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-4.png'] },
  ];

  userFilterSearch: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  addNewPrivilage() {

  }

  openUserFilterSearch() {
    this.userFilterSearch = true;
  }
  onFilterClosed() {
    this.userFilterSearch = false;
  }

}
