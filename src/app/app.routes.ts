import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UsersComponent } from './views/users/users.component';

export const routes: Routes = [
    {path:'home',component: HomeComponent},
    {path:'login',component: LoginComponent},
    {path:'users',component: UsersComponent},
    { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirigir a login por defecto
    { path: '**', redirectTo: '/login' }  // Redirigir a login si la ruta no existe
];
