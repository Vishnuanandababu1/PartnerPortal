import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputControlComponent } from '../../../shared/controls/input-control/input-control.component';
import { SelectControlComponent } from '../../../shared/controls/select-control/select-control.component';
import { FilterComponent } from '../../../shared/components/filter/filter.component';


@Component({
  selector: 'app-privilage-allocation',
  standalone: true,
  imports: [CommonModule, InputControlComponent, SelectControlComponent, FilterComponent],
  templateUrl: './privilege-allocation.component.html',
  styleUrl: './privilege-allocation.component.scss'
})
export class PrivilegeAllocationComponent implements OnInit {

  userRoles = [
    { id: 1, role: 'Administrator', levelId: '4', level: 'high', total: 5, images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png'] },

    { id: 2, role: 'Manager', total: 3, levelId: '3', level: 'medium', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-4.png', '../../../../images/avatars/user-5.png'] },
    { id: 3, role: 'Doctor', total: 7, levelId: '3', level: 'medium', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-4.png', '../../../../images/avatars/user-5.png', '../../../../images/avatars/user-6.png', '../../../../images/avatars/user-7.png'] },
    { id: 4, role: 'Nurse', total: 4, levelId: '2', level: 'low', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-4.png'] },
    { id: 5, role: 'Technician', total: 8, levelId: '2', level: 'low', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-5.png', '../../../../images/avatars/user-6.png', '../../../../images/avatars/user-7.png', '../../../../images/avatars/user-8.png', '../../../../images/avatars/user-9.png'] },
    { id: 6, role: 'Front Office', total: 6, levelId: '1', level: 'minor', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-4.png'] },
    { id: 7, role: 'Accountant', total: 2, levelId: '1', level: 'minor', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-4.png'] },
  ];


  AllRoleList = [
    {
      module: 'Module 1',
      pages: [
        {
          pagename: 'Dashboard',
          roles: [
            { id: '1', name: 'Administrator', isActive: true },
            { id: '2', name: 'Manager', isActive: false },
            { id: '3', name: 'Doctor', isActive: true },
            { id: '4', name: 'Nurse', isActive: true },
            { id: '5', name: 'Technician', isActive: false },
            { id: '6', name: 'Front Office', isActive: true },
            { id: '7', name: 'Accountant', isActive: true }
          ]
        },
        {
          pagename: 'Insights',
          roles: [
            { id: '1', name: 'Administrator', isActive: true },
            { id: '2', name: 'Manager', isActive: false },
            { id: '3', name: 'Doctor', isActive: true },
            { id: '4', name: 'Nurse', isActive: true },
            { id: '5', name: 'Technician', isActive: false },
            { id: '6', name: 'Front Office', isActive: true },
            { id: '7', name: 'Accountant', isActive: true }
          ]
        }
      ]
    },
    {
      module: 'Module 2',
      pages: [
        {
          pagename: 'Reports',
          roles: [
            { id: '1', name: 'Administrator', isActive: true },
            { id: '2', name: 'Manager', isActive: false },
            { id: '3', name: 'Doctor', isActive: true },
            { id: '4', name: 'Nurse', isActive: true },
            { id: '5', name: 'Technician', isActive: false },
            { id: '6', name: 'Front Office', isActive: true },
            { id: '7', name: 'Accountant', isActive: true }
          ]
        }
      ]
    }
  ];

  allRoles = Array.from(
    new Set(
      this.AllRoleList.flatMap(module => module.pages.flatMap(page => page.roles.map(role => role.id)))
    )
  ).map(id => ({ id, name: this.getRoleName(id) }));

  getRoleName(roleId: string): string {
    const role = this.AllRoleList.flatMap(module => module.pages.flatMap(page => page.roles))
      .find(r => r.id === roleId);
    return role ? role.name : 'Unknown Role';
  }

  getRoleStatus(moduleName: string, pagename: string, roleId: string): boolean {
    const module = this.AllRoleList.find(m => m.module === moduleName);
    const page = module?.pages.find(p => p.pagename === pagename);
    const role = page?.roles.find(r => r.id === roleId);
    return role ? role.isActive : false;
  }

  isFirstPageOfModule(pagename: string, moduleName: string): boolean {
    const module = this.AllRoleList.find(m => m.module === moduleName);
    return module?.pages[0].pagename === pagename;
  }






  roleListGridView: boolean = true;
  userFilterSearch: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  addNewPrivilage() {

  }
  onToggleSwitchView() {
    this.roleListGridView = !this.roleListGridView;
  }
  openUserFilterSearch() {
    this.userFilterSearch = true;
  }
  onFilterClosed() {
    this.userFilterSearch = false;
  }

}
