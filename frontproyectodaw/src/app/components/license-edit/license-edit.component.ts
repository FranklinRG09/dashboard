import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LicensesService } from '../../services/licenses.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-license-edit',
  imports: [
    MatIcon,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './license-edit.component.html',
  styleUrl: './license-edit.component.scss'
})
export class LicenseEditComponent {

  licenseForm: FormGroup;
  licenseObject: any = {};
  licenseId: number = 0;

  @Output() isLicenseSaved = new EventEmitter<any>();

  constructor(
    private dialogRef: MatDialogRef<LicenseEditComponent>,
    private formBuilder: FormBuilder,
    private licensesService: LicensesService,
    @Inject(MAT_DIALOG_DATA) public data: { licenseObject: any;} 
  ) {
    this.licenseObject = data.licenseObject;
    this.licenseId = data.licenseObject.id;

    this.licenseForm = this.formBuilder.group({
      name: [this.licenseObject.nombre, [Validators.required]],
      description: [this.licenseObject.descripcion, [Validators.required]],
      url: [this.licenseObject.url, [Validators.required]]
    });
    
  }

  closeLicensesCreateDialog() {
    this.dialogRef.close();
  }

  EditLicense(id: number) {
    if (this.licenseForm.valid) {
      const newLicense = {
        nombre: this.licenseForm.get('name')?.value,
        descripcion: this.licenseForm.get('description')?.value,
        url: this.licenseForm.get('url')?.value
      };

      this.licensesService.updateLicense(id, newLicense).subscribe({
        next: (response:any) => {

          this.isLicenseSaved.emit({
            isUpdated: true,
          });
          
          console.log('Licencia editada con éxito', response);
          // Aquí puedes manejar la respuesta después de crear la categoría
          this.closeLicensesCreateDialog();
          
        },
        error: (error:any) => {
          console.error('Error al editar la licencia', error);
        }
      });
    }
  }

}
