import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleCategoryRoutingModule } from './article-category-routing.module';
import { SharedModule } from '@shared/modules/shared.module';
import { TableModule } from '@shared/modules/table.module';

import { CreateCategoryComponent } from './create-category/create-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { ArticleCategoryComponent } from './article-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';


@NgModule({
  declarations: [ArticleCategoryComponent, CreateCategoryComponent, ListCategoryComponent, UpdateCategoryComponent],
  imports: [
    CommonModule,
    ArticleCategoryRoutingModule,
    SharedModule,
    TableModule
  ]
})
export class ArticleCategoryModule { }
