import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { UserRegistrationComponent } from './modules/uac/user-registration/user-registration.component';
import { UserProfileComponent } from './modules/uac/user-profile/user-profile.component';
import { PrivilageAllocationComponent } from './modules/uac/privilage-allocation/privilage-allocation.component';

export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'partnerlogin', component: LoginComponent },

    // {
    //     path: 'app',
    //     component: LayoutComponent,
    //     children: [
    //         { path: 'userregistration', component: UserRegistrationComponent },
    //         { path: 'privilageallocation', component: PrivilageAllocationComponent },
    //         { path: 'userprofile', component: UserProfileComponent }
    //     ]
    // }

    {
        path: 'app',
        component: LayoutComponent,
        children: [
            {
                path: 'usermanagement',
                loadComponent: () => import('./modules/uac/user-management/user-management.component').then((c) => c.UserManagementComponent)
            },
            {
                path: 'myprofile',
                loadComponent: () => import('./modules/uac/user-profile/user-profile.component').then((c) => c.UserProfileComponent)
            }, 
            {
                path: 'privilageallocation',
                loadComponent: () => import('./modules/uac/privilage-allocation/privilage-allocation.component').then((c) => c.PrivilageAllocationComponent)
            },
            {
                path: 'schedulesettings',
                loadComponent: () => import('./modules/uac/schedule-settings/schedule-settings.component').then((c) => c.ScheduleSettingsComponent)
            }
        ]
    }
];
