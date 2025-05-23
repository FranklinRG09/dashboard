import { Component } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category-create',
  imports: [
    MatIcon,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './category-create.component.html',
  styleUrl: './category-create.component.scss'
})
export class CategoryCreateComponent {

  categoryForm: FormGroup;

  @Output() isCategorySaved = new EventEmitter<any>();

  constructor(
    private dialogRef: MatDialogRef<CategoryCreateComponent>,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService
  ) {
    this.categoryForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  closeCategoriesCreateDialog() {
    this.dialogRef.close();
  }

  createCategory() {
    if (this.categoryForm.valid) {
      const newCategory = {
        nombre: this.categoryForm.get('name')?.value,
        descripcion: this.categoryForm.get('description')?.value,
      };

      this.categoriesService.createCategory(newCategory).subscribe({
        next: (response) => {

          this.isCategorySaved.emit({
            isCreated: true,
          });
          
          console.log('Categoría creada con éxito', response);
          // Aquí puedes manejar la respuesta después de crear la categoría
          this.closeCategoriesCreateDialog();
          
        },
        error: (error) => {
          console.error('Error al crear la categoría', error);
          // Aquí puedes manejar el error al crear la categoría
        }
      });
    } else {
      console.log('Formulario inválido');
    } 
  }

}
