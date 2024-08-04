import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { SelectControlComponent } from '../../../shared/controls/select-control/select-control.component';
import { InputControlComponent } from '../../../shared/controls/input-control/input-control.component';
import { AutocompleteControlComponent } from "../../../shared/controls/autocomplete-control/autocomplete-control.component";
import { MultiselectControlComponent } from '../../../shared/controls/multiselect-control/multiselect-control.component';
import { CalendarModule } from 'primeng/calendar';
import { TextareaControlComponent } from '../../../shared/controls/textarea-control/textarea-control.component';
import { CheckboxControlComponent } from '../../../shared/controls/checkbox-control/checkbox-control.component';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';

@Component({
  selector: 'app-privilege-creation',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule, SelectControlComponent, InputControlComponent, AutocompleteControlComponent, MultiselectControlComponent, CalendarModule, TextareaControlComponent, CheckboxControlComponent, DialogComponent],
  templateUrl: './privilege-creation.component.html',
  styleUrl: './privilege-creation.component.scss'
})
export class PrivilegeCreationComponent implements OnInit {


  modules = [
    {
      moduleId: '1',
      moduleName: 'User Access Control',
      description: 'Manage and restricts user permissions and access to resources within a system or application.',
      permissions: [
        { id: '11', page: 'Dashboard', controlName: 'uacDashboardAccess', isAllowed: false },
        { id: '12', page: 'User Management', controlName: 'userManagementAccess', isAllowed: false },
        { id: '13', page: 'Privilege Allocation', controlName: 'privilegeAllocationAccess', isAllowed: false },
        { id: '14', page: 'Schedule Settings', controlName: 'scheduleSettingsAccess', isAllowed: false },
        { id: '15', page: 'User Group', controlName: 'userManagementAccess', isAllowed: false },
        { id: '16', page: 'Attendance Management', controlName: 'uacDashboardAccess', isAllowed: false },
        { id: '17', page: 'Broadcast Messages', controlName: 'privilegeAllocationAccess', isAllowed: false },
      ]
    },
    {
      moduleId: '2',
      moduleName: 'Patient Administration Suite',
      description: 'Streamlines patient data management, appointment scheduling and medical records.',
      permissions: [
        { id: '21', page: 'Dashboard', controlName: 'pasDashboardAccess', isAllowed: false },
        { id: '22', page: 'Patient Registration', controlName: 'patientRegistrationAccess', isAllowed: false },
        { id: '23', page: 'Patient Management', controlName: 'patientManagementAccess', isAllowed: false },
        { id: '24', page: 'Appointment', controlName: 'appointmentAccess', isAllowed: false }
      ]
    }
  ];

  // Authority Level
  selectedLevelId: any;
  levelItem: string = '';
  authLevelOptions: any;
  levelList: { id: string; level: string }[] = [
    { id: '1', level: 'Minor' },
    { id: '2', level: 'Low' },
    { id: '3', level: 'Medium' },
    { id: '3', level: 'High' }
  ];
  selectLevel(event: any) {
    const selectedLevelName = event as string;
    const selectedLevel = this.levelList!.find(item => item.level === selectedLevelName);

    if (selectedLevel) {
      this.selectedLevelId = selectedLevel.id;
      this.levelItem = selectedLevel.level;
    }
  }

  // user type
  selectedUserTypeId: any;
  userTypeItem: string = '';
  userTypeOptions: any;
  userTypeList: { id: string; typeName: string }[] = [
    { id: '1', typeName: 'Doctor' },
    { id: '2', typeName: 'Non MD' },
    { id: '3', typeName: 'Nurse' },
    { id: '4', typeName: 'Staff' }
  ];
  selectUserType(event: any) {
    const selectedUserTypeName = event as string;
    const selectedUserTypeItem = this.userTypeList!.find(item => item.typeName === selectedUserTypeName);
    if (selectedUserTypeItem) {
      this.selectedUserTypeId = selectedUserTypeItem.id;
      this.userTypeItem = selectedUserTypeItem.typeName;
    }
  }

  roleCreationForm!: FormGroup;

  constructor(private router: Router, private fb: FormBuilder) {
    this.authLevelOptions = this.levelList.map(option => option.level);
    this.userTypeOptions = this.userTypeList.map(option => option.typeName);
  }

  ngOnInit(): void {
    this.roleCreationForm = this.fb.group({
      roleName: ['', [Validators.required, Validators.maxLength(30)]],
      authorityLevel: ['', [Validators.required]],
      userType: ['', [Validators.required]],
      logoutTime: ['', [Validators.required, Validators.min(15), Validators.max(999), Validators.maxLength(3)]],
      isAllowed: [false]
    });
  }

  onSaveRole() {

  }

  onCancelClick() {

  }
}
