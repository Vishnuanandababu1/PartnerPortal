import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SelectControlComponent } from "../../../shared/controls/select-control/select-control.component";

@Component({
  selector: 'app-login-history',
  standalone: true,
  imports: [CommonModule, SelectControlComponent],
  templateUrl: './login-history.component.html',
  styleUrl: './login-history.component.scss'
})
export class LoginHistoryComponent implements OnInit {


  login = [
    {
      date: '2024-08-01',
      site: 'Ernakulam',
      loginTime: '08:00 AM',
      logoutTime: '05:00 PM',
      loginStatus: 'Successful'
    },
    {
      date: '2024-08-02',
      site: 'Trivandrum',
      loginTime: '09:00 AM',
      logoutTime: '06:00 PM',
      loginStatus: 'Failed'
    },
    {
      date: '2024-08-03',
      site: 'Calicut',
      loginTime: '07:45 AM',
      logoutTime: '04:30 PM',
      loginStatus: 'Successful'
    },
    {
      date: '2024-08-04',
      site: 'Ernakulam',
      loginTime: '08:30 AM',
      logoutTime: '05:15 PM',
      loginStatus: 'Successful'
    },
    {
      date: '2024-08-05',
      site: 'Branch Office',
      loginTime: '09:15 AM',
      logoutTime: '06:05 PM',
      loginStatus: 'Successful'
    },
    {
      date: '2024-08-01',
      site: 'Ernakulam',
      loginTime: '08:00 AM',
      logoutTime: '05:00 PM',
      loginStatus: 'Successful'
    },
    {
      date: '2024-08-02',
      site: 'Trivandrum',
      loginTime: '09:00 AM',
      logoutTime: '06:00 PM',
      loginStatus: 'Failed'
    },
    {
      date: '2024-08-03',
      site: 'Calicut',
      loginTime: '07:45 AM',
      logoutTime: '04:30 PM',
      loginStatus: 'Successful'
    },
    {
      date: '2024-08-04',
      site: 'Ernakulam',
      loginTime: '08:30 AM',
      logoutTime: '05:15 PM',
      loginStatus: 'Successful'
    },
    {
      date: '2024-08-05',
      site: 'Branch Office',
      loginTime: '09:15 AM',
      logoutTime: '06:05 PM',
      loginStatus: 'Successful'
    }
  ];

  userFilterSearch: boolean = false;

  constructor() { }

  ngOnInit(): void {

  }

  openUserFilterSearch() {
    this.userFilterSearch = true;
  }
  onFilterClosed() {
    this.userFilterSearch = false;
  }

}
