import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { Config } from 'datatables.net';
import { CategoriesService } from '../../services/categories.service';
import { MatDialog } from '@angular/material/dialog';
import { CategoryCreateComponent } from '../../components/category-create/category-create.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { CategoryEditComponent } from '../../components/category-edit/category-edit.component';


@Component({
  selector: 'app-categories',
  imports: [
    MatIcon,
    MatButtonModule,
    CommonModule,
    DataTablesModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent implements OnInit {

  listCategories: any[] = [];
  isLoading: boolean = true;
  isCategorySaved: boolean = false;

  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.loadCategories();
  }

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

  loadCategories(): void {
    this.categoriesService.getCategories().subscribe({
      next: (data: any) => {
        this.listCategories = data;
        this.isLoading = false;
        console.log(this.listCategories);
        console.log('Categorías cargadas con éxito', data);
      },
      error: (error) => {
        console.error('Error al cargar las categorías', error);
      }
    }
    );
  }

  openCategoriesCreateDialog() {
    const dialogRef = this.dialog.open(CategoryCreateComponent, {
      width: '400px',
      panelClass: 'custom-border-radius-dialog',
    });

    dialogRef.componentInstance.isCategorySaved.subscribe((isSaved: any) => {
      console.log(isSaved);
      if (isSaved.isCreated) {

        Swal.fire({
          icon: 'success',
          title: 'Categoría creada',
          text: 'La Categoría se ha creado correctamente.',
          showConfirmButton: false,
          timer: 2500
        });
        
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/categories']);
        });
      }
    });
  }

  openCategoriesEditDialog(category: any) {
    const dialogRef = this.dialog.open(CategoryEditComponent, {
      width: '400px',
      panelClass: 'custom-border-radius-dialog',
      data: {
        categoryObject: category
      }
    });

    dialogRef.componentInstance.isCategorySaved.subscribe((isSaved: any) => {
      console.log(isSaved);
      if (isSaved.isUpdated) {

        Swal.fire({
          icon: 'success',
          title: 'Categoría editada',
          text: 'La Categoría se ha editado correctamente.',
          showConfirmButton: false,
          timer: 2500
        });
        
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate(['/categories']);
        });
      }
    });
  }
  
  deleteCategory(id: number) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriesService.deleteCategory(id).subscribe({
          next: (response) => {
            console.log('Categoría eliminada con éxito', response);
            // Fuerza la recarga del componente actual
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/categories']);
            });
          },
          error: (error) => {
            console.error('Error al eliminar la categoría', error);
          }
        });
        Swal.fire(
          'Eliminado!',
          'La categoría ha sido eliminada.',
          'success'
        )
      }
    })
  }

}
