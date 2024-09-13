import { Component } from '@angular/core';
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
import { rolCreate, rolResponse, rolUpdate } from '../../models/rol.interface';

import Swal from 'sweetalert2';
import { RolMapper } from '../../mappers/rol.mapper';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [
    NavbarComponent,
    NavbarComponent,
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
    AvatarGroupModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css'
})
export class RolesComponent {

  roles: rolResponse[] = []
  selectRol: rolResponse | undefined
  visible: boolean = false;
  newRolVisible: boolean = false
  isModalVisible = false;
  rolForm: FormGroup;
  newRolForm: FormGroup

  columnas: any[] = [
    { field: 'id_rol', header: 'ID' },
    { field: 'estado_rg', header: 'Estado' },
    { field: 'fecha_rg', header: 'Fecha' },
    { header: 'Opciones' },
  ];

  estados: any[] = [
    { id: 1, nombre: 'Activo' },
    { id: 0, nombre: 'Inactivo' }
  ];
  constructor(
    private fb: FormBuilder,
    private rolService: RolService
  ) {
        //formulario para rolRespose//
        this.rolForm = this.fb.group({
          id_rol: [{ value: '', disabled: true }, [Validators.required]],
          nombre_rol: ['', [Validators.required]],
          estado_rg: ['', [Validators.required]]
        });
    
        //formulario para rolCreate//
        this.newRolForm = this.fb.group({
          nombre_rol: ['', [Validators.required]]
        });

  }
  ngOnInit(): void {
    this.getAllRoles()
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

  showEditRol(rol: rolResponse) {
    this.selectRol = rol
    this.rolForm.patchValue(this.selectRol);
    this.visible = true;
  }

  getNombreRol(id_rol: number): string {
    const rol = this.roles.find(rol => rol.id_rol === id_rol);
    return rol ? rol.nombre_rol : 'N/A';
  }

  onEditRol(form: rolResponse) {
    const id = form.id_rol
    const rolUpdate: rolUpdate = RolMapper.mapToRoloUpdate(form);
    this.rolService.updateById(id, rolUpdate).subscribe({
      next: (data: rolResponse) => {
        Swal.fire({
          title: 'Rol actualizado',
          text: 'Rol actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error('Error al actualizar rol:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al actualizar rol.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      },
    })
  }

  onDeleteRol(form: rolResponse) {
    const id = form.id_rol;

    this.rolService.deleteById(id).subscribe({
      next: (data: boolean) => {
        Swal.fire({
          title: 'Rol eliminado',
          text: 'Rol eliminado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error('Error al eliminado Rol:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al eliminar rol.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      },
    })
  }

  onNewRol(form: rolCreate) {
    console.log(form)
    this.rolService.create(form).subscribe({
      next: (data: rolResponse) => {
        Swal.fire({
          title: 'Rol creado',
          text: 'Rol creado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error('Error al crear Rol:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al crear Rol.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      },
    })

  }
}
