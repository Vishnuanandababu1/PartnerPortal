import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputControlComponent } from '../../../shared/controls/input-control/input-control.component';
import { SelectControlComponent } from '../../../shared/controls/select-control/select-control.component';
import { FilterComponent } from '../../../shared/components/filter/filter.component';
import { PrivilegeCreationComponent } from "../privilege-creation/privilege-creation.component";


@Component({
  selector: 'app-privilage-allocation',
  standalone: true,
  imports: [CommonModule, InputControlComponent, SelectControlComponent, FilterComponent, PrivilegeCreationComponent],
  templateUrl: './privilege-allocation.component.html',
  styleUrl: './privilege-allocation.component.scss'
})
export class PrivilegeAllocationComponent implements OnInit {

  userRoles = [
    { id: 1, role: 'Administrator', totalUsers: 3, levelId: '4', level: 'high', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png'] },
    { id: 2, role: 'Manager', totalUsers: 3, levelId: '3', level: 'medium', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-4.png', '../../../../images/avatars/user-5.png'] },
    { id: 3, role: 'Doctor', totalUsers: 7, levelId: '3', level: 'medium', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-4.png', '../../../../images/avatars/user-5.png', '../../../../images/avatars/user-6.png', '../../../../images/avatars/user-7.png'] },
    { id: 4, role: 'Nurse', totalUsers: 4, levelId: '2', level: 'low', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-4.png'] },
    { id: 5, role: 'Assistant', totalUsers: 8, levelId: '2', level: 'low', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-5.png', '../../../../images/avatars/user-6.png', '../../../../images/avatars/user-7.png', '../../../../images/avatars/user-8.png', '../../../../images/avatars/user-9.png'] },
    { id: 6, role: 'Front Office', totalUsers: 6, levelId: '1', level: 'minor', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-4.png'] },
    { id: 7, role: 'Accountant', totalUsers: 2, levelId: '1', level: 'minor', images: ['../../../../images/avatars/user-1.png', '../../../../images/avatars/user-2.png', '../../../../images/avatars/user-3.png', '../../../../images/avatars/user-4.png'] },
  ];

  AllRoleList = [
    {
      module: 'UAC',
      moduleFullName: 'User Access Control',
      pages: [
        {
          pagename: 'Dashboard',
          roles: [
            { id: '1', name: 'Administrator', totalUsers: 4, levelId: '4', level: 'high', isActive: true },
            { id: '2', name: 'Manager', totalUsers: 3, levelId: '3', level: 'medium', isActive: false },
            { id: '3', name: 'Doctor', totalUsers: 7, levelId: '3', level: 'medium', isActive: true },
            { id: '4', name: 'Nurse', totalUsers: 4, levelId: '2', level: 'low', isActive: true },
            { id: '5', name: 'Assistant', totalUsers: 8, levelId: '2', level: 'low', isActive: false },
            { id: '6', name: 'Front Office', totalUsers: 6, levelId: '1', level: 'minor', isActive: true },
            { id: '7', name: 'Accountant', totalUsers: 2, levelId: '1', level: 'minor', isActive: true }
          ]
        },
        {
          pagename: 'User Management',
          roles: [
            { id: '1', name: 'Administrator', totalUsers: 4, levelId: '4', level: 'high', isActive: true },
            { id: '2', name: 'Manager', totalUsers: 3, levelId: '3', level: 'medium', isActive: false },
            { id: '3', name: 'Doctor', totalUsers: 7, levelId: '3', level: 'medium', isActive: true },
            { id: '4', name: 'Nurse', totalUsers: 4, levelId: '2', level: 'low', isActive: true },
            { id: '5', name: 'Assistant', totalUsers: 8, levelId: '2', level: 'low', isActive: false },
            { id: '6', name: 'Front Office', totalUsers: 6, levelId: '1', level: 'minor', isActive: true },
            { id: '7', name: 'Accountant', totalUsers: 2, levelId: '1', level: 'minor', isActive: true }
          ]
        },
        {
          pagename: 'Privilege Allocation',
          roles: [
            { id: '1', name: 'Administrator', totalUsers: 4, levelId: '4', level: 'high', isActive: true },
            { id: '2', name: 'Manager', totalUsers: 3, levelId: '3', level: 'medium', isActive: false },
            { id: '3', name: 'Doctor', totalUsers: 7, levelId: '3', level: 'medium', isActive: true },
            { id: '4', name: 'Nurse', totalUsers: 4, levelId: '2', level: 'low', isActive: true },
            { id: '5', name: 'Assistant', totalUsers: 8, levelId: '2', level: 'low', isActive: false },
            { id: '6', name: 'Front Office', totalUsers: 6, levelId: '1', level: 'minor', isActive: true },
            { id: '7', name: 'Accountant', totalUsers: 2, levelId: '1', level: 'minor', isActive: true }
          ]
        },
        {
          pagename: 'Schedule Settings',
          roles: [
            { id: '1', name: 'Administrator', totalUsers: 4, levelId: '4', level: 'high', isActive: true },
            { id: '2', name: 'Manager', totalUsers: 3, levelId: '3', level: 'medium', isActive: false },
            { id: '3', name: 'Doctor', totalUsers: 7, levelId: '3', level: 'medium', isActive: true },
            { id: '4', name: 'Nurse', totalUsers: 4, levelId: '2', level: 'low', isActive: true },
            { id: '5', name: 'Assistant', totalUsers: 8, levelId: '2', level: 'low', isActive: false },
            { id: '6', name: 'Front Office', totalUsers: 6, levelId: '1', level: 'minor', isActive: true },
            { id: '7', name: 'Accountant', totalUsers: 2, levelId: '1', level: 'minor', isActive: true }
          ]
        },
        {
          pagename: 'User Group',
          roles: [
            { id: '1', name: 'Administrator', totalUsers: 4, levelId: '4', level: 'high', isActive: true },
            { id: '2', name: 'Manager', totalUsers: 3, levelId: '3', level: 'medium', isActive: false },
            { id: '3', name: 'Doctor', totalUsers: 7, levelId: '3', level: 'medium', isActive: true },
            { id: '4', name: 'Nurse', totalUsers: 4, levelId: '2', level: 'low', isActive: true },
            { id: '5', name: 'Assistant', totalUsers: 8, levelId: '2', level: 'low', isActive: false },
            { id: '6', name: 'Front Office', totalUsers: 6, levelId: '1', level: 'minor', isActive: true },
            { id: '7', name: 'Accountant', totalUsers: 2, levelId: '1', level: 'minor', isActive: true }
          ]
        },
        {
          pagename: 'Attendance Management',
          roles: [
            { id: '1', name: 'Administrator', totalUsers: 4, levelId: '4', level: 'high', isActive: true },
            { id: '2', name: 'Manager', totalUsers: 3, levelId: '3', level: 'medium', isActive: false },
            { id: '3', name: 'Doctor', totalUsers: 7, levelId: '3', level: 'medium', isActive: true },
            { id: '4', name: 'Nurse', totalUsers: 4, levelId: '2', level: 'low', isActive: true },
            { id: '5', name: 'Assistant', totalUsers: 8, levelId: '2', level: 'low', isActive: false },
            { id: '6', name: 'Front Office', totalUsers: 6, levelId: '1', level: 'minor', isActive: true },
            { id: '7', name: 'Accountant', totalUsers: 2, levelId: '1', level: 'minor', isActive: true }
          ]
        },
        {
          pagename: 'Broadcast Messages',
          roles: [
            { id: '1', name: 'Administrator', totalUsers: 4, levelId: '4', level: 'high', isActive: true },
            { id: '2', name: 'Manager', totalUsers: 3, levelId: '3', level: 'medium', isActive: false },
            { id: '3', name: 'Doctor', totalUsers: 7, levelId: '3', level: 'medium', isActive: true },
            { id: '4', name: 'Nurse', totalUsers: 4, levelId: '2', level: 'low', isActive: true },
            { id: '5', name: 'Assistant', totalUsers: 8, levelId: '2', level: 'low', isActive: false },
            { id: '6', name: 'Front Office', totalUsers: 6, levelId: '1', level: 'minor', isActive: true },
            { id: '7', name: 'Accountant', totalUsers: 2, levelId: '1', level: 'minor', isActive: true }
          ]
        },
      ]
    },
    {
      module: 'PAS',
      moduleFullName: 'Patient Administration Suite',
      pages: [
        {
          pagename: 'Dashboard',
          roles: [
            { id: '1', name: 'Administrator', totalUsers: 4, levelId: '4', level: 'high', isActive: true },
            { id: '2', name: 'Manager', totalUsers: 3, levelId: '3', level: 'medium', isActive: false },
            { id: '3', name: 'Doctor', totalUsers: 7, levelId: '3', level: 'medium', isActive: true },
            { id: '4', name: 'Nurse', totalUsers: 4, levelId: '2', level: 'low', isActive: true },
            { id: '5', name: 'Assistant', totalUsers: 8, levelId: '2', level: 'low', isActive: false },
            { id: '6', name: 'Front Office', totalUsers: 6, levelId: '1', level: 'minor', isActive: true },
            { id: '7', name: 'Accountant', totalUsers: 2, levelId: '1', level: 'minor', isActive: true }
          ]
        },
        {
          pagename: 'Patient Registration',
          roles: [
            { id: '1', name: 'Administrator', totalUsers: 4, levelId: '4', level: 'high', isActive: true },
            { id: '2', name: 'Manager', totalUsers: 3, levelId: '3', level: 'medium', isActive: false },
            { id: '3', name: 'Doctor', totalUsers: 7, levelId: '3', level: 'medium', isActive: true },
            { id: '4', name: 'Nurse', totalUsers: 4, levelId: '2', level: 'low', isActive: true },
            { id: '5', name: 'Assistant', totalUsers: 8, levelId: '2', level: 'low', isActive: false },
            { id: '6', name: 'Front Office', totalUsers: 6, levelId: '1', level: 'minor', isActive: true },
            { id: '7', name: 'Accountant', totalUsers: 2, levelId: '1', level: 'minor', isActive: true }
          ]
        },
        {
          pagename: 'Patient Management',
          roles: [
            { id: '1', name: 'Administrator', totalUsers: 4, levelId: '4', level: 'high', isActive: true },
            { id: '2', name: 'Manager', totalUsers: 3, levelId: '3', level: 'medium', isActive: false },
            { id: '3', name: 'Doctor', totalUsers: 7, levelId: '3', level: 'medium', isActive: true },
            { id: '4', name: 'Nurse', totalUsers: 4, levelId: '2', level: 'low', isActive: true },
            { id: '5', name: 'Assistant', totalUsers: 8, levelId: '2', level: 'low', isActive: false },
            { id: '6', name: 'Front Office', totalUsers: 6, levelId: '1', level: 'minor', isActive: true },
            { id: '7', name: 'Accountant', totalUsers: 2, levelId: '1', level: 'minor', isActive: true }
          ]
        },
        {
          pagename: 'Appointment',
          roles: [
            { id: '1', name: 'Administrator', totalUsers: 4, levelId: '4', level: 'high', isActive: true },
            { id: '2', name: 'Manager', totalUsers: 3, levelId: '3', level: 'medium', isActive: false },
            { id: '3', name: 'Doctor', totalUsers: 7, levelId: '3', level: 'medium', isActive: true },
            { id: '4', name: 'Nurse', totalUsers: 4, levelId: '2', level: 'low', isActive: true },
            { id: '5', name: 'Assistant', totalUsers: 8, levelId: '2', level: 'low', isActive: false },
            { id: '6', name: 'Front Office', totalUsers: 6, levelId: '1', level: 'minor', isActive: true },
            { id: '7', name: 'Accountant', totalUsers: 2, levelId: '1', level: 'minor', isActive: true }
          ]
        }
      ]
    }
  ];



  currentRole: any;
  roleListGridView: boolean = true;
  userFilterSearch: boolean = false;
  privilegeCreation: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  // general clicks
  addNewPrivilage() {
    this.privilegeCreation = true;
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

  // role table functions

  // list of all roles from the data
  allRoles = Array.from(
    new Map(
      this.AllRoleList.flatMap(module =>
        module.pages.flatMap(page =>
          page.roles.map(role => [role.id, role] as [string, typeof role])
        )
      )
    ).values()
  ).map(role => ({
    id: role.id,
    name: role.name,
    totalUsers: role.totalUsers,
    levelId: role.levelId,
    level: role.level
  }));

  // fetches the role name by role ID
  getRoleName(roleId: string): string {
    const role = this.AllRoleList.flatMap(module => module.pages.flatMap(page => page.roles))
      .find(r => r.id === roleId);
    return role ? role.name : 'Unknown Role';
  }

  // retrieves the status of a role based on module name, page name, and role ID
  getRoleStatus(moduleName: string, pagename: string, roleId: string): boolean {
    const module = this.AllRoleList.find(m => m.module === moduleName);
    const page = module?.pages.find(p => p.pagename === pagename);
    const role = page?.roles.find(r => r.id === roleId);
    return role ? role.isActive : false;
  }

  // checks if the given page is the first page of the specified module
  isFirstPageOfModule(pagename: string, moduleName: string): boolean {
    const module = this.AllRoleList.find(m => m.module === moduleName);
    return module?.pages[0].pagename === pagename;
  }

  // editing of a selected role
  editRole(roleId: string) {
    const allRoles = this.AllRoleList.flatMap(module => module.pages.flatMap(page => page.roles));
    const role = allRoles.find(r => r.id === roleId);

    if (role) {
      this.currentRole = { ...role };
      console.log('Selected Role:', this.currentRole);

      if (role.id === '1') {
        console.log('You have selected an Administrator role.');
      }

    } else {
      console.log('Role not found');
    }
  }

}
