import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { TabMenuModule } from 'primeng/tabmenu';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    TabMenuModule,
    ButtonModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {

  items: MenuItem[];

  constructor(private router: Router) {
    this.items = [
      { label: 'Principal', icon: 'pi pi-home', command: () => this.router.navigate(['/home']) },
      { label: 'Usuarios', icon: 'pi pi-user', command: () => this.router.navigate(['/users']) },
      { label: 'Roles', icon: ' pi pi-id-card', command: () => this.router.navigate(['/profile']) },
      { label: 'Servicios', icon: 'pi pi-truck', command: () => this.router.navigate(['/profile']) }
    ];
  }

}
