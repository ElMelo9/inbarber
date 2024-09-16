import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common'; 
import { DropdownModule } from 'primeng/dropdown';
import { SplitButtonModule } from 'primeng/splitbutton';
import { deleteFromLocalStorage, getFromLocalStorage } from '../../helpers/storage-helper';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    TabMenuModule,
    ButtonModule,
    AvatarModule,
    MenubarModule,
    BadgeModule,
    CommonModule,
    DropdownModule,
    SplitButtonModule 
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  items: MenuItem[];

  userOpcion: any[];

  concurretUser: string;

  constructor(private router: Router) {
    
    this.items = [
      { label: 'InBarber'},
      { label: 'Principal', icon: 'pi pi-home', command: () => this.router.navigate(['/home']) },
      { label: 'Usuarios', icon: 'pi pi-user', command: () => this.router.navigate(['/users']) },
      { label: 'Barrios', icon: ' pi pi-map-marker', command: () => this.router.navigate(['/barrios']) },
      { label: 'Tipos documentos', icon: ' pi pi-file', command: () => this.router.navigate(['/tipoDoc']) },
      { label: 'Roles', icon: ' pi pi-id-card', command: () => this.router.navigate(['/roles']) },
      { label: 'Servicios', icon: 'pi pi-truck', command: () => this.router.navigate(['/profile']) }
    ];

    this.userOpcion = [
      {label: 'Cambiar Contraseña'},
      {label: 'Cerrar Sesion',command: () => this.outSession()}
    ]
    this.concurretUser = getFromLocalStorage('nombre_usuario')



  }

  outSession():boolean {
    if(!deleteFromLocalStorage("token")) return false
    if(!deleteFromLocalStorage("tipo")) return false
    if(!deleteFromLocalStorage("exp")) return false
    if(!deleteFromLocalStorage("nombre_usuario")) return false
    this.router.navigate(['/login'])
    return true
  }

}
