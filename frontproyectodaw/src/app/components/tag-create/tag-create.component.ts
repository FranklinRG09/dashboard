import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TagsService } from '../../services/tags.service';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tag-create',
  imports: [
    MatIcon,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule,
    MatProgressSpinnerModule
  ],
  templateUrl: './tag-create.component.html',
  styleUrl: './tag-create.component.scss'
})
export class TagCreateComponent implements OnInit {

  listCategories: any[] = [];

  tagForm: FormGroup;
  isLoading: boolean = true;
  @Output() isTagSaved = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<TagCreateComponent>,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private tagsService: TagsService
  ) {
    this.tagForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      color: ['', [Validators.required]],
      categoryId: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.getAllCategories();
  }

  closeTagCreateDialog() {
    this.dialogRef.close();
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

  createNewTag() {
    if (this.tagForm.valid) {
      const newTag = {
        nombre: this.tagForm.get('name')?.value,
        descripcion: this.tagForm.get('description')?.value,
        color: this.tagForm.get('color')?.value,
        categoria: {
          "id": this.tagForm.get('categoryId')?.value
        }
      };

      this.tagsService.createTag(newTag).subscribe({
        next: (response: any) => {

          this.isTagSaved.emit({
            isCreated: true,
          });
          console.log('Etiqueta creada con éxito', response);
          // Aquí puedes manejar la respuesta después de crear la etiqueta
          this.closeTagCreateDialog();
        },
        error: (error) => {
          console.error('Error al crear la etiqueta', error);
          // Aquí puedes manejar el error al crear la etiqueta
        }
      });
    } else {
      console.log('Formulario inválido');
    } 
  }

}
