import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { InputControlComponent } from '../../../library/controls/input-control/input-control.component';
import { SelectControlComponent } from '../../../library/controls/select-control/select-control.component';
import { FilterComponent } from '../../../library/components/filter/filter.component';

@Component({
  selector: 'app-user-management',
  standalone: true,
  imports: [CommonModule, InputControlComponent, SelectControlComponent, FilterComponent],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent implements OnInit {

  allProviderList = [
    { name: 'Dr Avneesh Kumar', id: '13456', department: 'General Dentist', img: '../../../../images/avatars/user-9.png', roomno: '107-A', availableslots: '24', online: true },
    { name: 'Dr Janaki Raman', id: '76456', department: 'Endodontist', img: '../../../../images/avatars/avatar-4.jpg', roomno: '107-B', availableslots: '18', online: false },
    { name: 'Dr Anuradha Krishna', id: '98345', department: 'Oral Pathologist', img: '../../../../images/avatars/avatar-5.jpg', roomno: '202-E', availableslots: '13', online: true },
    { name: 'Dr Haseena Beegam', id: '34765', department: 'Orthodontist', img: '../../../../images/avatars/avatar-8.jpg', roomno: '202-F', availableslots: '12', online: false },
    { name: 'Dr Janaki Raman', id: '76456', department: 'Endodontist', img: '../../../../images/avatars/avatar-4.jpg', roomno: '107-B', availableslots: '18', online: false },
  ]


  users = [
    { userId: 'U001', fullname: 'Dr Avneesh Kumar', userRole: 'Doctor', designation: 'Cardiologist', emailId: 'john.doe@example.com', site: 'Trivandrum', status: 'Active', online: true, img: '../../../../images/avatars/user-9.png' },
    { userId: 'U002', fullname: 'Jane Smith', userRole: 'Nurse', designation: 'Head Nurse', emailId: 'jane.smith@example.com', site: 'Kochi', status: 'Active', online: true, img: '../../../../images/avatars/avatar-4.jpg' },
    { userId: 'U003', fullname: 'Michael Brown', userRole: 'Technician', designation: 'Lab Technician', emailId: 'michael.brown@example.com', site: 'Trivandrum', status: 'Active', online: false, img: '../../../../images/avatars/avatar-5.jpg' },
    { userId: 'U004', fullname: 'Dr Emily Johnson', userRole: 'Doctor', designation: 'Dermatologist', emailId: 'emily.johnson@example.com', site: 'Kochi', status: 'Active', online: true, img: '../../../../images/avatars/avatar-8.jpg' },
    { userId: 'U005', fullname: 'Chris Lee', userRole: 'Receptionist', designation: 'Front Desk', emailId: 'chris.lee@example.com', site: 'Calicut', status: 'Active', online: true, img: '../../../../images/avatars/avatar-4.jpg' },
    { userId: 'U006', fullname: 'Dr Anna Scott Mathew', userRole: 'Doctor', designation: 'Pediatrician', emailId: 'anna.scott@example.com', site: 'Trivandrum', status: 'Active', online: false, img: '../../../../images/avatars/user-9.png' },
    { userId: 'U007', fullname: 'David Turner', userRole: 'Admin', designation: 'Administrator', emailId: 'david.turner@example.com', site: 'Kochi', status: 'Active', online: true, img: '../../../../images/avatars/avatar-4.jpg' },
    { userId: 'U008', fullname: 'Sarah White', userRole: 'Technician', designation: 'Radiology Technician', emailId: 'sarah.white@example.com', site: 'Calicut', status: 'Active', online: true, img: '../../../../images/avatars/avatar-5.jpg' },
    { userId: 'U009', fullname: 'Dr Daniel Green Thomas', userRole: 'Doctor', designation: 'Orthopedic', emailId: 'daniel.green@example.com', site: 'Trivandrum', status: 'Active', online: false, img: '../../../../images/avatars/avatar-8.jpg' },
    { userId: 'U010', fullname: 'Jessica Blue', userRole: 'Nurse', designation: 'Assistant Nurse', emailId: 'jessica.blue@example.com', site: 'Kochi', status: 'Active', online: true, img: '../../../../images/avatars/avatar-4.jpg' }
  ];

  patListGridView = true;
  userFilterSearch: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }


  onToggleSwitchView() {
    this.patListGridView = !this.patListGridView;
  }
  openUserFilterSearch() {
    this.userFilterSearch = true;
  }
  onFilterClosed() {
    this.userFilterSearch = false;
  }

  viewUserProfile(type: string) {
    if (type === 'checkin') {

    }
    if (type === 'walkin') {

    }
  }
}
