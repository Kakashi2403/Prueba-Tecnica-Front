import { Routes } from '@angular/router';
import { AuthGuard } from './components/auth/guards/auth.guard'

export const routes: Routes = [
    {path: '', redirectTo:'auth', pathMatch:'full'},
    {
        path:'home',
        loadComponent:() => import('./components/home/home.component').then(c => c.HomeComponent),
        canActivate: [AuthGuard],
        data:{
            roles: ['admin', 'cliente']
        }
    },
    {
        path:'users',
        loadComponent:() => import('./components/users/users.component').then(c => c.UsersComponent),
        canActivate: [AuthGuard],
        data:{
            roles: ['admin', 'cliente']
        }
    },
    {
        path:'vms',
        loadComponent:() => import('./components/vms/vms.component').then(c => c.VMsComponent),
        canActivate: [AuthGuard],
        data:{
            roles: ['admin', 'cliente']
        }
    },
    {
        path: 'auth',
        loadComponent:() => import('./components/auth/auth.component').then(c => c.AuthComponent),
    },
    {
        path: 'unauthorized',
        loadComponent: () =>
          import('./components/unauthorized/unauthorized.component').then(
            (c) => c.UnauthorizedComponent
          )
    }
];
