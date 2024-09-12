import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { usuarioResponse, UsuarioUpdate } from '../../models/usuario.inteface';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { CommonModule } from '@angular/common';
import { SpeedDialModule } from 'primeng/speeddial';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { FloatLabelModule } from 'primeng/floatlabel';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';





@Component({
  selector: 'app-users',
  standalone: true,
  imports: [NavbarComponent,
    TableModule,
    CommonModule,
    TagModule,
    SpeedDialModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ReactiveFormsModule,
    DropdownModule,
    FloatLabelModule,
    AvatarModule,
    AvatarGroupModule 
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  usuarios: usuarioResponse[] = []
  selectUser: usuarioResponse | undefined
  visible: boolean = false;
  isModalVisible = false;
  userForm: FormGroup;


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
    { header: 'Opciones' },
  ];

  estados: any[] = [
    { id: '1', nombre: 'Activo' },
    { id: '0', nombre: 'Inactivo' }
  ];


  constructor(private userService: UsersService, private fb: FormBuilder) {

    this.userForm = this.fb.group({
      id_usuario: [{ value: '', disabled: true }, [Validators.required]],
      id_rol: ['', [Validators.required]],
      id_tipo_documento: ['', [Validators.required]],
      doc_usuario: ['', [Validators.required]],
      nombre_usuario: ['', [Validators.required]],
      apellido_usuario: ['', [Validators.required]],
      direccion_usuario: ['', [Validators.required]],
      id_barrio: ['', [Validators.required]],
      email_usuario: ['', [Validators.required, Validators.email]],
      telefono_usuario: ['', [Validators.required]],
      estado_rg: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAllUsers()
  }

  getAllUsers(): void {

    this.userService.getAll().subscribe({
      next: (data: usuarioResponse[]) => {
        this.usuarios = data;
        console.log(this.usuarios)
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      },
    })

  }

  showEditUser(user: usuarioResponse) {
    this.selectUser= user
    this.userForm.patchValue(user);
    this.visible = true;
  }


  onEditUser(form: UsuarioUpdate) {

  }

}
