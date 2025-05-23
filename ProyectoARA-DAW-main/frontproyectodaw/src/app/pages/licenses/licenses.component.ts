import { Component, OnInit } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from "angular-datatables";
import { Config } from 'datatables.net';
import { LicensesService } from '../../services/licenses.service';
import { MatDialog } from '@angular/material/dialog';
import { LicenseCreateComponent } from '../../components/license-create/license-create.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { Router } from '@angular/router';
import Swal from 'sweetalert2'
import { LicenseEditComponent } from '../../components/license-edit/license-edit.component';

@Component({
  selector: 'app-licenses',
  imports: [
    MatIcon,
    MatButtonModule,
    CommonModule,
    DataTablesModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './licenses.component.html',
  styleUrl: './licenses.component.scss'
})
export class LicensesComponent implements OnInit {

  listLicenses: any[] = [];
  isLoading: boolean = true;
  isLicenseSaved: boolean = false;

  constructor(
    private licensesService: LicensesService,
    private dialog: MatDialog,
    private router: Router
  ) { }  

  ngOnInit(): void {
    this.loadLicenses();
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

  loadLicenses(): void {
    this.licensesService.getLicenses().subscribe({
      next: (data: any) => {
        this.listLicenses = data;
        this.isLoading = false;
        console.log(this.listLicenses);
        console.log('Licencia cargadas con éxito', data);
      },
      error: (error) => {
        console.error('Error al cargar las licencias', error);
      }
    }
    );
  }

  openLicensesCreateDialog() {
    const dialogRef = this.dialog.open(LicenseCreateComponent, {
      width: '400px',
      panelClass: 'custom-border-radius-dialog',
    });

    dialogRef.componentInstance.isLicenseSaved.subscribe((isSaved: any) => {
          console.log(isSaved);
          if (isSaved.isCreated) {
    
            Swal.fire({
              icon: 'success',
              title: 'Licencia creada',
              text: 'La Licencia se ha creado correctamente.',
              showConfirmButton: false,
              timer: 2500
            });
            
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
              this.router.navigate(['/licenses']);
            });
          }
        });
  }

  openLicensesEditDialog(license: any) {
   const dialogRef = this.dialog.open(LicenseEditComponent, {
         width: '400px',
         panelClass: 'custom-border-radius-dialog',
         data: {
           licenseObject: license
         }
       });
   
       dialogRef.componentInstance.isLicenseSaved.subscribe((isSaved: any) => {
         console.log(isSaved);
         if (isSaved.isUpdated) {
   
           Swal.fire({
             icon: 'success',
             title: 'Licencia editada',
             text: 'La Licencia se ha editado correctamente.',
             showConfirmButton: false,
             timer: 2500
           });
           
           this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
             this.router.navigate(['/licenses']);
           });
         }
       });
  }

  deleteLicense(id: number) {
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
            this.licensesService.deleteLicense(id).subscribe({
              next: (response) => {
                console.log('Licencia eliminada con éxito', response);
                // Fuerza la recarga del componente actual
                this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
                  this.router.navigate(['/licenses']);
                });
              },
              error: (error) => {
                console.error('Error al eliminar la licencia', error);
              }
            });
            Swal.fire(
              'Eliminado!',
              'La licencia ha sido eliminada.',
              'success'
            )
          }
        })
  }
}
