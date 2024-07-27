import { CommonModule, DOCUMENT } from '@angular/common';
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { ClickOutsideModule } from 'ng-click-outside';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DialogComponent } from '../../library/components/dialog/dialog.component';
import { ModalComponent } from '../../library/components/modal/modal.component';
import { ChangePasswordComponent } from '../../auth/change-password/change-password.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ClickOutsideModule, ModalComponent, DialogComponent, ChangePasswordComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  elem: any;

  patAdvanceSearch: boolean = false;
  patInfoPreview: boolean = false;
  patListAlphaSort: boolean = false;
  patListGridView: boolean = true;
  allPatientsList: boolean = false;

  nightModeIcon: boolean = false;
  isFullScreenMode: boolean = false;
  notificationslist: boolean = false;
  langmultimenulist: boolean = false;
  userActionlist: boolean = false;
  userLogoutDialog: boolean = false;
  changePasswordModal: boolean = false;
  searchPatient: { name: string, mrn: string, gender: string, age: string, img: string, online: boolean }[] = [];

  supportLanguages = [
    { code: 'en', displayName: 'English' },
    { code: 'ar', displayName: 'Arabic' },
    { code: 'ma', displayName: 'Malayalam' }
  ];
  alphabet = [
    { id: 'A', aplh: 'A', },
    { id: 'B', aplh: 'B', },
    { id: 'C', aplh: 'C', },
    { id: 'D', aplh: 'D', },
    { id: 'E', aplh: 'E', },
    { id: 'F', aplh: 'F', },
    { id: 'G', aplh: 'G', },
    { id: 'H', aplh: 'H', },
    { id: 'I', aplh: 'I', },
    { id: 'J', aplh: 'J', },
    { id: 'K', aplh: 'K', },
    { id: 'L', aplh: 'L', },
    { id: 'M', aplh: 'M', },
    { id: 'N', aplh: 'N', },
    { id: 'O', aplh: 'O', },
    { id: 'P', aplh: 'P', },
    { id: 'Q', aplh: 'Q', },
    { id: 'R', aplh: 'R', },
    { id: 'S', aplh: 'S', },
    { id: 'T', aplh: 'T', },
    { id: 'U', aplh: 'U', },
    { id: 'V', aplh: 'V', },
    { id: 'W', aplh: 'W', },
    { id: 'X', aplh: 'X', },
    { id: 'Y', aplh: 'Y', },
    { id: 'Z', aplh: 'Z', }
  ]
  patientlist = [
    { name: 'Vishnu Anandababu', mrn: 'MRN-7234284', gender: 'M', age: '27', img: '../../../../../images/avatars/user-10.png', online: true },
    { name: 'Pooja Pradeep', mrn: 'MRN-5678345', gender: 'F', age: '43', img: '../../../../../images/avatars/user-1.png', online: true },
    { name: 'Neena Jasmine', mrn: 'MRN-7634468', gender: 'F', age: '26', img: '../../../../../images/avatars/user-3.png', online: false },
    { name: 'Pradeep Kumar', mrn: 'MRN-8909905', gender: 'M', age: '54', img: '../../../../../images/avatars/user-7.png', online: true },
    { name: 'Nikhel Antony Augustine', mrn: 'MRN-5467890', gender: 'M', age: '32', img: '../../../../../images/avatars/user-5.png', online: false },
    { name: 'Vidhya As', mrn: 'MRN-8712657', gender: 'F', age: '23', img: '../../../../../images/avatars/user-6.png', online: true },
    { name: 'Soorya Anil', mrn: 'MRN-2375325', gender: 'F', age: '38', img: '../../../../../images/avatars/user-8.png', online: true },
    { name: 'Vivek Gopan', mrn: 'MRN-4673484', gender: 'M', age: '45', img: '../../../../../images/avatars/user-10.png', online: true },
    { name: 'Pavithra Nath', mrn: 'MRN-3456835', gender: 'F', age: '43', img: '../../../../../images/avatars/user-1.png', online: true },
    { name: 'Meena Kumar', mrn: 'MRN-5684343', gender: 'F', age: '26', img: '../../../../../images/avatars/user-3.png', online: false },
    { name: 'Ashika Antony', mrn: 'MRN-5909905', gender: 'M', age: '54', img: '../../../../../images/avatars/user-7.png', online: true },
    { name: 'Ankush S', mrn: 'MRN-2453890', gender: 'M', age: '32', img: '../../../../../images/avatars/user-5.png', online: false },
    { name: 'Krishna Mohan', mrn: 'MRN-8812657', gender: 'F', age: '23', img: '../../../../../images/avatars/user-6.png', online: true },
    { name: 'Malavika Shivakumar', mrn: 'MRN-8645325', gender: 'F', age: '38', img: '../../../../../images/avatars/user-8.png', online: true },
    { name: 'Akhil Prabha', mrn: 'MRN-1234284', gender: 'M', age: '27', img: '../../../../../images/avatars/user-10.png', online: true },
    { name: 'Sajeev Jayakumar', mrn: 'MRN-2345345', gender: 'M', age: '43', img: '../../../../../images/avatars/user-5.png', online: true },
    { name: 'Gayathri', mrn: 'MRN-9874468', gender: 'F', age: '26', img: '../../../../../images/avatars/user-3.png', online: false },
    { name: 'Akshay Krishnan', mrn: 'MRN-4089905', gender: 'M', age: '54', img: '../../../../../images/avatars/user-7.png', online: true },
    { name: 'Adith Gopan', mrn: 'MRN-2345780', gender: 'M', age: '32', img: '../../../../../images/avatars/user-5.png', online: false },
    { name: 'Neha Aloshi', mrn: 'MRN-8745757', gender: 'F', age: '23', img: '../../../../../images/avatars/user-6.png', online: true },
    { name: 'Mishma Vishwanath', mrn: 'MRN-2372925', gender: 'F', age: '38', img: '../../../../../images/avatars/user-8.png', online: true }
  ];

  constructor(
    private router: Router, @Inject(DOCUMENT) private document: any) { }

  ngOnInit(): void {
    this.filterPatients('');
    this.elem = document.documentElement;
  }

  // patient list
  showPatientList() {
    this.allPatientsList = true;
  }
  onClosePatlist() {
    this.patAdvanceSearch = false;
    this.allPatientsList = false;
  }
  filterPatients(inputValue: string) {
    this.searchPatient = this.patientlist.filter((patient) =>
      patient.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      patient.mrn.toLowerCase().includes(inputValue.toLowerCase())
    );
  }
  // filterPatients(inputValue: string) {
  //   const regex = new RegExp([...inputValue].join('.*'), 'i');
  //   this.searchPatient = this.patientlist.filter((patient) =>
  //     regex.test(patient.name) || regex.test(patient.mrn)
  //   );
  // }
  onSearchInput(event: Event) {
    this.allPatientsList = true;
    if (event.target instanceof HTMLInputElement) {
      const inputValue = event.target.value;
      this.filterPatients(inputValue);
    }
  }
  onTogglePatAdvanceSearch() {
    this.patAdvanceSearch = !this.patAdvanceSearch;
  }
  onTogglePatPreview() {
    this.patInfoPreview = !this.patInfoPreview;
  }
  onToggleAlphaView() {
    this.patListAlphaSort = !this.patListAlphaSort;
  }
  onToggleSwitchView() {
    this.patListGridView = !this.patListGridView;
  }

  // header actions
  sidemenuToggle() {
    document.querySelector('.menu-layout')?.classList.toggle('open');
  }
  addNewPatient() {
    // this.router.navigate(['/patientregistration']);
    // this.router.navigate(['/patientmanagement']);
  }
  openFullscreen() {
    this.isFullScreenMode = true;
    if (this.elem.requestFullscreen) {
      this.elem.requestFullscreen();
    } else if (this.elem.mozRequestFullScreen) {
      this.elem.mozRequestFullScreen();
    } else if (this.elem.webkitRequestFullscreen) {
      this.elem.webkitRequestFullscreen();
    } else if (this.elem.msRequestFullscreen) {
      this.elem.msRequestFullscreen();
    }
  }
  closeFullscreen() {
    this.isFullScreenMode = false;
    if (this.elem.exitFullscreen) {
      this.elem.exitFullscreen();
    } else if (this.document.mozCancelFullScreen) {
      this.document.mozCancelFullScreen();
    } else if (this.document.webkitExitFullscreen) {
      this.document.webkitExitFullscreen();
    } else if (this.document.msExitFullscreen) {
      this.document.msExitFullscreen();
    }
  }
  @HostListener('document:fullscreenchange', ['$event'])
  @HostListener('document:webkitfullscreenchange', ['$event'])
  @HostListener('document:mozfullscreenchange', ['$event'])
  @HostListener('document:MSFullscreenChange', ['$event'])
  handleFullScreenChange(event: Event) {
    this.isFullScreenMode = !!(
      this.document.fullscreenElement ||
      this.document.mozFullScreenElement ||
      this.document.webkitFullscreenElement ||
      this.document.msFullscreenElement
    );
  }
  showUserNotifications() {
    this.notificationslist = !this.notificationslist;
  }
  closeUserNotifications() {
    this.notificationslist = false;
  }
  showLangMenuList() {
    this.langmultimenulist = !this.langmultimenulist;
  }
  closeLangMenuList(e: Event) {
    this.langmultimenulist = false;
  }

  changeLanguage(langCode: string) {
    // this.translateService.use(langCode);
    // this.langmultimenulist = false;
    // if (langCode === 'ar') {
    //   document.querySelector("body")?.classList.add("app-rtl");
    // } else {
    //   document.querySelector("body")?.classList.remove("app-rtl");
    // };
  }

  showUserActions() {
    this.userActionlist = true;
  }
  closeUserActions() {
    this.userActionlist = false;
  }
  userProfile() {
    this.userActionlist = false;
    this.router.navigate(['/app/myprofile']);
  }
  passwordChangeRequest() {
    this.userActionlist = false;
    this.changePasswordModal = true;
  }
  onModalClosed() {
    this.changePasswordModal = false;
  }
  closeChangePasswordModal() {
    this.changePasswordModal = false;
  }
  lockScreenRequest() {

  }
  isNightMode() {
    this.userActionlist = false;
    this.nightModeIcon = !this.nightModeIcon;
    document.querySelector('body')?.classList.toggle('night-mode');
  }
  userLogoutRequest() {
    this.userActionlist = false;
    this.userLogoutDialog = true;
  }
  onConfirmLogout() {
    this.userLogoutDialog = false;
    this.router.navigate(['/partnerlogin']);
  }
  onCancelLogout() {
    this.userLogoutDialog = false;
  }

}
