import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { MenubarModule } from 'primeng/menubar';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    TabMenuModule,
    ButtonModule,
    AvatarModule,
    MenubarModule,
    BadgeModule,
    CommonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  items: MenuItem[];

  constructor(private router: Router) {
    
    this.items = [
      { label: 'InBarber'},
      { label: 'Principal', icon: 'pi pi-home', command: () => this.router.navigate(['/home']) },
      { label: 'Usuarios', icon: 'pi pi-user', command: () => this.router.navigate(['/users']) },
      { label: 'Barrios', icon: ' pi pi-map-marker', command: () => this.router.navigate(['/profile']) },
      { label: 'Tipos documentos', icon: ' pi pi-file', command: () => this.router.navigate(['/profile']) },
      { label: 'Roles', icon: ' pi pi-id-card', command: () => this.router.navigate(['/profile']) },
      { label: 'Servicios', icon: 'pi pi-truck', command: () => this.router.navigate(['/profile']) }
    ];
  }

}
