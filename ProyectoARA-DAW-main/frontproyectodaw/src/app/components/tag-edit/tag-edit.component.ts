import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { CategoriesService } from '../../services/categories.service';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormsModule } from '@angular/forms';
import { TagsService } from '../../services/tags.service';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-tag-edit',
  imports: [
    MatIcon,
    CommonModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './tag-edit.component.html',
  styleUrl: './tag-edit.component.scss'
})
export class TagEditComponent {

  tagForm: FormGroup;
  tagObject: any = {};
  tagId: number = 0;
  listCategories: any[] = [];

  @Output() isTagSaved = new EventEmitter<any>();

  constructor(
    public dialogRef: MatDialogRef<TagEditComponent>,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private tagsService: TagsService,
    @Inject(MAT_DIALOG_DATA) public data: { tagObject: any; listCategories: any[]; }
  ) {

    this.tagObject = data.tagObject;
    this.tagId = data.tagObject.id;
    this.listCategories = data.listCategories;
    

    this.tagForm = this.formBuilder.group({
      name: [this.tagObject.nombre, [Validators.required]],
      description: [this.tagObject.descripcion, [Validators.required]],
      color: [this.tagObject.color, [Validators.required]],
      categoryId: [this.tagObject.categoriaId, [Validators.required]]
    });

    console.log(this.tagObject.categoriaId);
  }

  EditTag(id: number) {
    if (this.tagForm.valid) {
      const newTag = {
        nombre: this.tagForm.get('name')?.value,
        descripcion: this.tagForm.get('description')?.value,
        color: this.tagForm.get('color')?.value,
        categoria: {
          "id": this.tagForm.get('categoryId')?.value
        }
      };

      this.tagsService.updateTag(id, newTag).subscribe({
        next: (response: any) => {
          this.isTagSaved.emit({
            isUpdated: true,
          });
          this.dialogRef.close(true);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  closeTagCreateDialog() {
    this.dialogRef.close();
  } 

}
