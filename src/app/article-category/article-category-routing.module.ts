import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleCategoryComponent } from './article-category.component';

const routes: Routes = [{
  path: '', redirectTo: 'create'
},
{
  path: 'create', component: ArticleCategoryComponent
},
{
  path: 'list', component: ArticleCategoryComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleCategoryRoutingModule { }
