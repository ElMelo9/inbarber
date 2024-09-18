import { Component } from '@angular/core';
import { UsersService } from '../../services/users/users.service';
import { usuarioResponse, UsuarioUpdate, usuarioCreate } from '../../models/usuario.inteface';
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
import { RolService } from '../../services/rol/rol.service';
import { BarrioService } from '../../services/barrio/barrio.service';
import { rolResponse } from '../../models/rol.interface';
import { barrioResponse } from '../../models/barrio.interface';
import { tipoDocResponse } from '../../models/tipoDoc.interface';
import { TipoDocService } from '../../services/tipoDoc/tipo-doc.service';
import { UsuarioMapper } from '../../mappers/usuario.mapper';
import { ToolbarModule } from 'primeng/toolbar';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import Swal from 'sweetalert2';





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
    AvatarGroupModule,
    ToolbarModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {

  usuarios: usuarioResponse[] = []
  roles: rolResponse[] = []
  barrios: barrioResponse[] = []
  tipoDocs: tipoDocResponse[] = []
  selectUser: usuarioResponse | undefined
  visible: boolean = false;
  newUserVisible: boolean = false
  isModalVisible = false;
  userForm: FormGroup;
  newUserForm: FormGroup


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
    { id: 1, nombre: 'Activo' },
    { id: 0, nombre: 'Inactivo' }
  ];


  constructor(
    private userService: UsersService,
    private fb: FormBuilder,
    private rolService: RolService,
    private barrioService: BarrioService,
    private tipoDocService: TipoDocService
  ) {

    //formulario para usuarioRespose//
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

    //formulario para usuarioCreate//
    this.newUserForm = this.fb.group({
      id_rol: ['', [Validators.required]],
      id_tipo_documento: ['', [Validators.required]],
      doc_usuario: ['', [Validators.required]],
      nombre_usuario: ['', [Validators.required]],
      apellido_usuario: ['', [Validators.required]],
      direccion_usuario: ['', [Validators.required]],
      id_barrio: ['', [Validators.required]],
      email_usuario: ['', [Validators.required, Validators.email]],
      telefono_usuario: ['', [Validators.required]],
      password_usuario: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAllUsers()
    this.getAllRoles()
    this.getAllBarrios()
    this.getAllTipoDoc()
  }

  getAllUsers(): void {

    this.userService.getAll().subscribe({
      next: (data: usuarioResponse[]) => {
        this.usuarios = data;
        //console.log(this.usuarios)
      },
      error: (error) => {
        console.error('Error al obtener usuarios:', error);
      },
    })

  }

  getAllRoles(): void {
    this.rolService.getAll().subscribe({
      next: (data: rolResponse[]) => {
        this.roles = data;
        //console.log(this.roles)
      }, error: (error) => {
        console.error('Error al obtener los roles:', error);
      },
    })
  }

  getAllBarrios(): void {
    this.barrioService.getAll().subscribe({
      next: (data: barrioResponse[]) => {
        this.barrios = data;
        //console.log(this.barrios)
      }, error: (error) => {
        console.error('Error al obtener los barrios:', error);
      },
    })
  }

  getAllTipoDoc(): void {
    this.tipoDocService.getAll().subscribe({
      next: (data: tipoDocResponse[]) => {
        this.tipoDocs = data;
        //console.log(this.tipoDocs)
      }, error: (error) => {
        console.error('Error al obtener los tipos de documentos:', error);
      },
    })
  }

  showEditUser(user: usuarioResponse) {
    this.selectUser = user
    this.userForm.patchValue(this.selectUser);
    this.visible = true;
  }

  getNombreRol(id_rol: number): string {
    const rol = this.roles.find(rol => rol.id_rol === id_rol);
    return rol ? rol.nombre_rol : 'N/A';
  }

  getNombreBarrio(id_barrio: number): string {
    const barrio = this.barrios.find(barrio => barrio.id_barrio === id_barrio);
    return barrio ? barrio.nombre_barrio : 'N/A';
  }


  onEditUser(form: usuarioResponse) {
    const id = form.id_usuario
    const usuarioUpdate: UsuarioUpdate = UsuarioMapper.mapToUsuarioUpdate(form);
    this.userService.updateById(id, usuarioUpdate).subscribe({
      next: (data: usuarioResponse) => {
        Swal.fire({
          title: 'Usuario actualizado',
          text: 'Usuario actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error('Error al actualizar usuario:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problemaal actualizar usuario.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      },
    })

  }

  onDeleteUser(form: usuarioResponse) {
    const id = form.id_usuario;

    this.userService.deleteById(id).subscribe({
      next: (data: boolean) => {
        Swal.fire({
          title: 'Usuario eliminado',
          text: 'Usuario eliminado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error('Error al eliminado usuario:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problemaal eliminado usuario.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      },
    })
  }
  
  onNewUser(form: usuarioCreate) {
    console.log(form)
    this.userService.create(form).subscribe({
      next: (data: usuarioResponse) => {
        Swal.fire({
          title: 'Usuario creado',
          text: 'Usuario creado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error('Error al crear usuario:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al crear usuario.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      },
    })

  }


}
