
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {

  // userMenu = [
  //   { tabName: 'home', route: '/patientdashboard', iconClass: 'vi vi-home-o', name: 'Home' },
  //   { tabName: 'patient', route: '/patientregistration', iconClass: 'vi vi-patient-o', name: 'Patient Registration' },
  //   { tabName: 'schedule', route: '/appointmentschedule', iconClass: 'vi vi-calendar-o', name: 'Schedule Appointment' },
  //   { tabName: 'appointment', route: '/appointmentboard', iconClass: 'vi vi-kanban-o', name: 'Appointment Board' },
  //   { tabName: 'groups', route: '/patientgroups', iconClass: 'vi vi-patient-group-o', name: 'Patient Group' },
  //   { tabName: 'broadcast', route: '/broadcast', iconClass: 'vi vi-bullhorn-o', name: 'Broadcast Messages' },
  //   { tabName: 'Leads', route: '/patientleads', iconClass: 'vi vi-patient-lead-o', name: 'Patient Leads' },
  //   { tabName: 'surveillance', route: '/surveillance', iconClass: 'vi vi-file-text-o', name: 'Patient Surveillance' }
  // ];

  userMenu = [
    { tabName: 'usermanagement', route: '/app/usermanagement', iconClass: 'vi vi-employee-o', name: 'User Management' },
    { tabName: 'privilageallocation', route: '/app/privilageallocation', iconClass: 'vi vi-employee-key-o', name: 'Privilage Allocation' },
    { tabName: 'schedulesettings', route: '/app/schedulesettings', iconClass: 'vi vi-employee-schedule-o', name: 'Schedule Settings' },
    { tabName: 'attendancemanagement', route: '/app/attendancemanagement', iconClass: 'vi vi-calendar-o', name: 'Attendance Management' },
    { tabName: 'usergroup', route: '/app/#', iconClass: 'vi vi-user-group-o', name: 'User Group' },
    { tabName: 'broadcast', route: '/app/#', iconClass: 'vi vi-bullhorn-o', name: 'Broadcast Messages' },
  ];

  activeTab = 'usermanagement';

  constructor(private router: Router) { }

  ngOnInit(): void {

  }

  onTabClick(tabName: string) {
    this.activeTab = tabName;
    if (tabName === 'usermanagement') {


    }
  }

  closeModuleMenu() {
    document.querySelector('.menu-layout')?.classList.remove('open');
  }

}
