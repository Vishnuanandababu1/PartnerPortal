import { Routes } from '@angular/router';

export const uacRoutes: Routes = [
    {
        path: '',
        // component: UserManagementComponent,
        // loadComponent: () => import('./user-management/user-management.component').then(c => c.UserManagementComponent),
        children: [
            {
                path: 'usermanagement',
                loadComponent: () => import('./user-management/user-management.component').then((c) => c.UserManagementComponent)
            },
            {
                path: 'myprofile',
                loadComponent: () => import('./user-profile/user-profile.component').then((c) => c.UserProfileComponent)
            },
            {
                path: 'privilegeallocation',
                loadComponent: () => import('./privilege-allocation/privilege-allocation.component').then((c) => c.PrivilegeAllocationComponent)
            },
            {
                path: 'schedulesettings',
                loadComponent: () => import('./schedule-settings/schedule-settings.component').then((c) => c.ScheduleSettingsComponent)
            },
            {
                path: 'attendancemanagement',
                loadComponent: () => import('./attendance-management/attendance-management.component').then((c) => c.AttendanceManagementComponent)
            },
            {
                path: 'usergroup',
                loadComponent: () => import('./user-group/user-group.component').then((c) => c.UserGroupComponent)
            },
            {
                path: 'userbroadcast',
                loadComponent: () => import('./user-broadcast/user-broadcast.component').then((c) => c.UserBroadcastComponent)
            },
        ]
    }

];