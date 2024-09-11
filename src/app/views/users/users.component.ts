import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { usuarioResponse } from '../../models/usuario.inteface';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common'; 
import { SpeedDialModule } from 'primeng/speeddial';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent,TableModule,CommonModule,TagModule,SpeedDialModule,ButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  usuarios: usuarioResponse [] = []


  columnas: any[] = [
    { field: 'id_usuario', header: 'ID' },
    { field: 'id_rol', header: 'Rol' },
    { field: 'doc_usuario', header: 'Documento' },
    { field: 'nombre_usuario', header: 'Nombre' },
    { field: 'apellido_usuario', header: 'Apellido' },
    { field: 'direccion_usuario', header: 'Direccion' },
    { field: 'id_barrio', header: 'Barrio' },
    { field: 'email_usuario', header: 'Email' },
    { field: 'telefono_usuario', header: 'Telefono' },
    { field: 'estado_rg', header: 'Estado' },
    { field: 'fecha_rg', header: 'Fecha' },
    {  header: 'Opciones' },
  ];



  constructor(private userService: UsersService) { }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(): void {

    this.userService.getAll().subscribe({
      next: (data: usuarioResponse []) => {
        this.usuarios = data;
        console.log(this.usuarios)
    },
    error: (error) => {
      console.error('Error al obtener usuarios:', error);
    },
  })

  }

}
