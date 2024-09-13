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
import { barrioCreate, barrioResponse, barrioUpdate } from '../../models/barrio.interface';
import { BarrioService } from '../../services/barrio/barrio.service';
import { BarrioMapper } from '../../mappers/barrio.mapper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-barrios',
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
    AvatarGroupModule
  ],
  templateUrl: './barrios.component.html',
  styleUrl: './barrios.component.css'
})
export class BarriosComponent {

  barrios: barrioResponse[] = []
  selectBarrio: barrioResponse | undefined
  visible: boolean = false;
  newBarrioVisible: boolean = false
  isModalVisible = false;
  barrioForm: FormGroup;
  newBarrioForm: FormGroup

  columnas: any[] = [
    { field: 'id_barrio', header: 'ID' },
    { field: 'nombre_barrio', header: 'Nombre' },
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
    private barrioService: BarrioService
  ) {
        //formulario para rolRespose//
        this.barrioForm = this.fb.group({
          id_barrio: [{ value: '', disabled: true }, [Validators.required]],
          nombre_barrio: ['', [Validators.required]],
          estado_rg: ['', [Validators.required]]
        });
    
        //formulario para rolCreate//
        this.newBarrioForm = this.fb.group({
          nombre_barrio: ['', [Validators.required]]
        });

  }

  ngOnInit(): void {
    this.getAllBarrios()
  }

  getAllBarrios(): void {
    this.barrioService.getAll().subscribe({
      next: (data: barrioResponse[]) => {
        this.barrios = data;
        //console.log(this.roles)
      }, error: (error) => {
        console.error('Error al obtener los roles:', error);
      },
    })
  }

  showEditBarrio(barrio: barrioResponse) {
    this.selectBarrio = barrio
    this.barrioForm.patchValue(this.selectBarrio);
    this.visible = true;
  }

  getNombreBarrio(id_barrio: number): string {
    const rol = this.barrios.find(barrio => barrio.id_barrio === id_barrio);
    return rol ? rol.nombre_barrio : 'N/A';
  }

  onEditBarrio(form: barrioResponse) {
    const id = form.id_barrio
    const barrioUpdate: barrioUpdate = BarrioMapper.mapToBarrioUpdate(form);
    this.barrioService.updateById(id, barrioUpdate).subscribe({
      next: (data: barrioResponse) => {
        Swal.fire({
          title: 'Barrio actualizado',
          text: 'Barrio actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error('Error al actualizar barrio:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al actualizar barrio.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      },
    })
  }

  
  onDeleteBarrio(form: barrioResponse) {
    const id = form.id_barrio;

    this.barrioService.deleteById(id).subscribe({
      next: (data: boolean) => {
        Swal.fire({
          title: 'Barrio eliminado',
          text: 'Barrio eliminado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error('Error al eliminado barrio:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al eliminar barrio.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      },
    })
  }

  onNewBarrio(form: barrioCreate) {
    console.log(form)
    this.barrioService.create(form).subscribe({
      next: (data: barrioResponse) => {
        Swal.fire({
          title: 'Barrio creado',
          text: 'Barrio creado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error('Error al crear Barrio:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al crear Barrio.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      },
    })

  }

}
