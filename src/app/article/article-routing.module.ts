import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article.component';

const routes: Routes = [{
  path: '', redirectTo: 'create'
},
{
  path: 'create', component: ArticleComponent 
},
{
  path: 'list', component: ArticleComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRoutingModule { }
