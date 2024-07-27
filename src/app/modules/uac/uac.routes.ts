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
                path: 'privilageallocation',
                loadComponent: () => import('./privilage-allocation/privilage-allocation.component').then((c) => c.PrivilageAllocationComponent)
            },
            {
                path: 'schedulesettings',
                loadComponent: () => import('./schedule-settings/schedule-settings.component').then((c) => c.ScheduleSettingsComponent)
            }
        ]
    }

];