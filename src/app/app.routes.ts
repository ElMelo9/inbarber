import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UsersComponent } from './views/users/users.component';
import { RolesComponent } from './views/roles/roles.component';
import { BarriosComponent } from './views/barrios/barrios.component';

export const routes: Routes = [
    {path:'home',component: HomeComponent},
    {path:'login',component: LoginComponent},
    {path:'users',component: UsersComponent},
    {path:'roles',component: RolesComponent},
    {path:'barrios',component: BarriosComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirigir a login por defecto
    { path: '**', redirectTo: '/login' }  // Redirigir a login si la ruta no existe
];
