import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';
import { SharedModule } from '@shared/modules/shared.module';
import { TableModule } from '@shared/modules/table.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [ArticleComponent, CreateArticleComponent, ListArticleComponent, UpdateArticleComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    SharedModule,
    TableModule,
    MatTabsModule,
    MatDialogModule,
    MatMenuModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }
  ]
})
export class ArticleModule { }
