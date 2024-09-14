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
import { tipoDocCreate, tipoDocResponse, tipoDocUpdate } from '../../models/tipoDoc.interface';
import { TipoDocService } from '../../services/tipoDoc/tipo-doc.service';
import { TipoDocMapper } from '../../mappers/tipoDoc.mapper';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tipo-doc',
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
  templateUrl: './tipo-doc.component.html',
  styleUrl: './tipo-doc.component.css'
})
export class TipoDocComponent {

  tiposDocs: tipoDocResponse[] = []
  selectTipoDoc: tipoDocResponse | undefined
  visible: boolean = false;
  newTipoDocVisible: boolean = false
  isModalVisible = false;
  tipoDocForm: FormGroup;
  newTipoDocForm: FormGroup

  columnas: any[] = [
    { field: 'id_tipo_documento', header: 'ID' },
    { field: 'sigla_tipo_documento', header: 'Sigla' },
    { field: 'nombre_tipo_documento', header: 'Nombre' },
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
    private tipoDocService: TipoDocService
  ) {
        //formulario para tipoDoRespose//
        this.tipoDocForm = this.fb.group({
          id_tipo_documento: [{ value: '', disabled: true }, [Validators.required]],
          sigla_tipo_documento: ['', [Validators.required]],
          nombre_tipo_documento: ['', [Validators.required]],
          estado_rg: ['', [Validators.required]]
        });
    
        //formulario para tipoDocCreate//
        this.newTipoDocForm = this.fb.group({
          nombre_tipo_documento: ['', [Validators.required]],
          sigla_tipo_documento: ['', [Validators.required]]
        });

  }
  ngOnInit(): void {
    this.getAllTipoDoc()
  }

  getAllTipoDoc(): void {
    this.tipoDocService.getAll().subscribe({
      next: (data: tipoDocResponse[]) => {
        this.tiposDocs = data;
        //console.log(this.roles)
      }, error: (error) => {
        console.error('Error al obtener los tipos de documentos:', error);
      },
    })
  }

  showEditTipoDoc(tipoDoc: tipoDocResponse) {
    this.selectTipoDoc = tipoDoc;
    this.tipoDocForm.patchValue(this.selectTipoDoc);
    this.visible = true;
  }

  getNombreTipoDoc(id_tipo_documento: number): string {
    const tipoDoc = this.tiposDocs.find(tipoDoc => tipoDoc.id_tipo_documento === id_tipo_documento);
    return tipoDoc ? tipoDoc.nombre_tipo_documento : 'N/A';
  }

  onEditTipoDoc(form: tipoDocResponse) {
    const id = form.id_tipo_documento
    const tipoDocUpdate: tipoDocUpdate = TipoDocMapper.mapToTipoDocUpdate(form);
    this.tipoDocService.updateById(id, tipoDocUpdate).subscribe({
      next: (data: tipoDocResponse) => {
        Swal.fire({
          title: 'Tipo documento actualizado',
          text: 'Tipo documento actualizado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error('Error al actualizar tipo documento:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al actualizar tipo documento.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      },
    })
  }

  onDeleteTipoDoc(form: tipoDocResponse) {
    const id = form.id_tipo_documento;

    this.tipoDocService.deleteById(id).subscribe({
      next: (data: boolean) => {
        Swal.fire({
          title: 'Tipo documento eliminado',
          text: 'Tipo documento eliminado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error('Error al eliminado Tipo documento:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al eliminar Tipo documento.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      },
    })
  }

  onNewTipoDoc(form: tipoDocCreate) {
    console.log(form)
    this.tipoDocService.create(form).subscribe({
      next: (data: tipoDocResponse) => {
        Swal.fire({
          title: 'Tipo documento creado',
          text: 'Tipo documento creado correctamente.',
          icon: 'success',
          confirmButtonText: 'Ok'
        });
      },
      error: (error) => {
        console.error('Error al crear Tipo documento:', error);
        Swal.fire({
          title: 'Error',
          text: 'Hubo un problema al crear Tipo documento.',
          icon: 'error',
          confirmButtonText: 'Intentar de nuevo'
        });
      },
    })

  }

}
