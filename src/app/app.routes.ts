import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LayoutComponent } from './layout/layout.component';


export const routes: Routes = [
    { path: '', component: LoginComponent, pathMatch: 'full' },
    { path: 'partnerlogin', component: LoginComponent },
    {
        path: 'app/emr',
        component: LayoutComponent,
        loadChildren: () => import('./modules/emr/emr.routes').then(c => c.emrRoutes)
    },
    {
        path: 'app/pas',
        component: LayoutComponent,
        loadChildren: () => import('./modules/pas/pas.routes').then(c => c.pasRoutes)
    },
    {
        path: 'app/uac',
        component: LayoutComponent,
        loadChildren: () => import('./modules/uac/uac.routes').then(c => c.uacRoutes)
    },
    {
        path: 'app/masters',
        component: LayoutComponent,
        loadChildren: () => import('./modules/masters/masters.routes').then(c => c.mastersRoutes)
    },
];
