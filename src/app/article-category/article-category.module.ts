import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleCategoryRoutingModule } from './article-category-routing.module';
import { SharedModule } from '@shared/modules/shared.module';
import { TableModule } from '@shared/modules/table.module';

import { CreateCategoryComponent } from './create-category/create-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { ArticleCategoryComponent } from './article-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FileSelectorModule } from '@shared/modules/file-selector.module';


@NgModule({
  declarations: [ArticleCategoryComponent, CreateCategoryComponent, ListCategoryComponent, UpdateCategoryComponent],
  imports: [
    CommonModule,
    ArticleCategoryRoutingModule,
    SharedModule,
    TableModule,
    MatTabsModule,
    MatDialogModule,
    FileSelectorModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }
  ]
})
export class ArticleCategoryModule { }
