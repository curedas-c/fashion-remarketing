import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article.component';
import { CreateArticleComponent } from './create-article/create-article.component';
import { ListArticleComponent } from './list-article/list-article.component';
import { UpdateArticleComponent } from './update-article/update-article.component';

const routes: Routes = [{
  path: '',
  component: ArticleComponent
},

{
  path: 'create',
  component: CreateArticleComponent
},
{
  path: 'list',
  component: ListArticleComponent
},
{
  path: 'update/:uuid',
  component: UpdateArticleComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
