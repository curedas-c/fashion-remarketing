import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleCategoryComponent } from './article-category.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { ListCategoryComponent } from './list-category/list-category.component';
import { UpdateCategoryComponent } from './update-category/update-category.component';

const routes: Routes = [{
  path: '',
  component: ArticleCategoryComponent
},
{
  path: 'create',
  component: CreateCategoryComponent,
},
{
  path: 'list',
  component: ListCategoryComponent,
},
{
  path: 'update/:uuid',
  component: UpdateCategoryComponent,
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleCategoryRoutingModule { }
