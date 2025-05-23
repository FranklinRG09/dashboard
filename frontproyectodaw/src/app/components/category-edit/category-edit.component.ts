import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CategoriesService } from '../../services/categories.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-category-edit',
  imports: [
    MatIcon,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './category-edit.component.html',
  styleUrl: './category-edit.component.scss'
})
export class CategoryEditComponent {

  categoryForm: FormGroup;
  categodyObject: any = {};
  categoryId: number = 0;

  @Output() isCategorySaved = new EventEmitter<any>();

  constructor(
    private dialogRef: MatDialogRef<CategoryEditComponent>,
    private formBuilder: FormBuilder,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: { categoryObject: any;} 
  ) {
    this.categodyObject = data.categoryObject;
    this.categoryId = data.categoryObject.id;

    this.categoryForm = this.formBuilder.group({
      name: [this.categodyObject.nombre, [Validators.required]],
      description: [this.categodyObject.descripcion, [Validators.required]]
    });
    
  }

  closeCategoriesCreateDialog() {
    this.dialogRef.close();
  }

  EditCategory(id: number) {
    if (this.categoryForm.valid) {
      const newCategory = {
        nombre: this.categoryForm.get('name')?.value,
        descripcion: this.categoryForm.get('description')?.value,
      };

      this.categoriesService.updateCategory(id, newCategory).subscribe({
        next: (response:any) => {

          this.isCategorySaved.emit({
            isUpdated: true,
          });
          
          console.log('Categoría editada con éxito', response);
          // Aquí puedes manejar la respuesta después de crear la categoría
          this.closeCategoriesCreateDialog();
          
        },
        error: (error:any) => {
          console.error('Error al editar la categoría', error);
        }
      });
    }
  }
  

}
