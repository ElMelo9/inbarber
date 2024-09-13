import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UsersComponent } from './views/users/users.component';
import { RolesComponent } from './views/roles/roles/roles.component';

export const routes: Routes = [
    {path:'home',component: HomeComponent},
    {path:'login',component: LoginComponent},
    {path:'users',component: UsersComponent},
    {path:'roles',component: RolesComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirigir a login por defecto
    { path: '**', redirectTo: '/login' }  // Redirigir a login si la ruta no existe
];
