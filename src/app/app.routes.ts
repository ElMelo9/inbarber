import { Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './views/login/login.component';
import { UsersComponent } from './views/users/users.component';
import { RolesComponent } from './views/roles/roles.component';
import { BarriosComponent } from './views/barrios/barrios.component';
import { TipoDocComponent } from './views/tipo-doc/tipo-doc.component';
import { authGuard } from './auth/auth.guard';

export const routes: Routes = [
    {path:'login',component: LoginComponent},
    {path:'home',component: HomeComponent,canActivate: [authGuard]},
    {path:'users',component: UsersComponent,canActivate: [authGuard]},
    {path:'roles',component: RolesComponent,canActivate: [authGuard]},
    {path:'barrios',component: BarriosComponent,canActivate: [authGuard]},
    {path:'tipoDoc',component: TipoDocComponent,canActivate: [authGuard]},
    { path: '', redirectTo: '/login', pathMatch: 'full' },  // Redirigir a login por defecto
    { path: '**', redirectTo: '/login' }  // Redirigir a login si la ruta no existe
];
