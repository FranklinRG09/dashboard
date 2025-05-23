import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LicensesService } from '../../services/licenses.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-license-create',
  imports: [
    MatIcon,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './license-create.component.html',
  styleUrl: './license-create.component.scss'
})
export class LicenseCreateComponent {

  licenseForm: FormGroup;

  @Output() isLicenseSaved = new EventEmitter<any>();

  constructor(
    private dialogRef: MatDialogRef<LicenseCreateComponent>,
    private formBuilder: FormBuilder,
    private licensesService: LicensesService
  ) {
    this.licenseForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      url: ['', [Validators.required]]
    });
  }

  closeLicensesCreateDialog() {
    this.dialogRef.close();
  }

  createLicense() {
    if (this.licenseForm.valid) {
      const newLicense = {
        nombre: this.licenseForm.get('name')?.value,
        descripcion: this.licenseForm.get('description')?.value,
        url: this.licenseForm.get('url')?.value
      };

      this.licensesService.createLicense(newLicense).subscribe({
        next: (response) => {

          this.isLicenseSaved.emit({
            isCreated: true,
          });

          console.log('Categoría creada con éxito', response);
          // Aquí puedes manejar la respuesta después de crear la categoría
          this.closeLicensesCreateDialog();
          
        },
        error: (error) => {
          console.error('Error al crear la licencia', error);
          // Aquí puedes manejar el error al crear la categoría
        }
      });
    } else {
      console.log('Formulario inválido');
    } 
  }
}
