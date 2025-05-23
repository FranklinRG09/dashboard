import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { TagCreateComponent } from '../../components/tag-create/tag-create.component';
import { MatButtonModule } from '@angular/material/button';
import { DataTableDirective, DataTablesModule } from "angular-datatables";
import { Config } from 'datatables.net';
import { Subject } from 'rxjs';
import { TagsService } from '../../services/tags.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { TagEditComponent } from '../../components/tag-edit/tag-edit.component';
import { CategoriesService } from '../../services/categories.service';

@Component({
  selector: 'app-tags',
  imports: [
    MatIcon,
    CommonModule,
    MatButtonModule,
    DataTablesModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './tags.component.html',
  styleUrl: './tags.component.scss'
})
export class TagsComponent implements OnInit {

  dtOptions: Config = {
    pagingType: 'full_numbers',
    pageLength: 10,
    ordering: true,
    language: {
      processing: 'Procesando...',
      search: 'Buscar:',
      lengthMenu: 'Mostrar _MENU_ elementos',
      info: 'Mostrando desde _START_ al _END_ de _TOTAL_ elementos',
      infoEmpty: 'Mostrando ningún elemento.',
      infoFiltered: '(filtrado _MAX_ elementos total)',
      infoPostFix: '',
      loadingRecords: 'Cargando registros...',
      zeroRecords: 'No se encontraron registros',
      emptyTable: 'No hay datos disponibles en la tabla',
      paginate: {
        previous: 'Anterior',
        next: 'Siguiente'
      }

    },
  };

  listTags: any[] = [];
  isLoading: boolean = true;
  listCategories: any[] = [];

  constructor(
    private dialog: MatDialog,
    private tagsService: TagsService,
    private router: Router,
    private categoriesService: CategoriesService
  ) { }

  ngOnInit(): void {
    this.loadTags();
    this.getAllCategories();
  }

  openTagCreateDialog() {
    const dialogRef = this.dialog.open(TagCreateComponent, {
      width: '450px',
      panelClass: 'custom-border-radius-dialog',
    });

    dialogRef.componentInstance.isTagSaved.subscribe((isSaved: any) => {
      console.log(isSaved);
      if (isSaved.isCreated) {
        Swal.fire({
          icon: 'success',
          title: 'Etiqueta creada',
          text: 'La etiqueta se ha creado correctamente.',
          showConfirmButton: false,
          timer: 2500
        });
        // Fuerza la recarga del componente actual
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/tags']);
        });
      }
    });
  }

  loadTags() {
    this.tagsService.getAllTags().subscribe({
      next: (data: any) => {
        this.listTags = data;
        this.isLoading = false;
        console.log(this.listTags);
        console.log('Etiquetas cargadas con éxito', data);
      },
      error: (error) => {
        console.error('Error al cargar las etiquetas', error);
      }
    });
  }


  openTagEditDialog(tag: any) {
    const dialogRef = this.dialog.open(TagEditComponent, {
      width: '450px',
      panelClass: 'custom-border-radius-dialog',
      data: {
        tagObject: tag,
        listCategories: this.listCategories        
      }
    });

    dialogRef.componentInstance.isTagSaved.subscribe((isSaved: any) => {
      console.log(isSaved);
      if (isSaved.isUpdated) {
        Swal.fire({
          icon: 'success',
          title: 'Etiqueta editada',
          text: 'La etiqueta se ha editado correctamente.',
          showConfirmButton: false
        });
        // Fuerza la recarga del componente actual
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/tags']);
        });
      }
    });
  }

  deleteTag(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.tagsService.deleteTag(id).subscribe({
          next: () => {
            Swal.fire(
              'Eliminado!',
              'La etiqueta ha sido eliminada.',
              'success'
            );
            // Fuerza la recarga del componente actual
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/tags']);
            });
          },
          error: (error) => {
            console.error('Error al eliminar la etiqueta', error);
          }
        });
      }
    });
  }

  getAllCategories() {
    this.categoriesService.getCategories().subscribe({
      next: (response: any) => {
        this.listCategories = response;
      },
      error: (error: any) => {
        console.error('Error al obtener las categorías', error);
        // Aquí puedes manejar el error al obtener las categorías
      }
    });
  }
}
