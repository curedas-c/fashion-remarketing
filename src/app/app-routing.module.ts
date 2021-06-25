import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ErrorPageComponent } from '@shared/components/error-page/error-page.component';
import { NotFoundPageComponent } from '@shared/components/not-found-page/not-found-page.component';
import { LayoutComponent } from './layout/layout.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      {
        path: 'home',
        loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
      },
      {
        path: 'notification',
        loadChildren: () => import('./notification/notification.module').then(m => m.NotificationModule)
      },
      {
        path: 'promotion',
        loadChildren: () => import('./promotion/promotion.module').then(m => m.PromotionModule)
      },
      {
        path: 'data',
        loadChildren: () => import('./data/data.module').then(m => m.DataModule)
      },
      {
        path: 'article',
        loadChildren: () => import('./article/article.module').then(m => m.ArticleModule)
      },
      {
        path: 'article-category',
        loadChildren: () => import('./article-category/article-category.module').then(m => m.ArticleCategoryModule)
      },
      {
        path: 'error',
        component: ErrorPageComponent
      },
      {
        path: '404',
        component: NotFoundPageComponent
      }
    ]
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/dashboard/home'
  },
  {
    path: '**',
    redirectTo: '/dashboard/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    useHash: false,
    enableTracing: false,
    preloadingStrategy: PreloadAllModules,
    initialNavigation: 'enabledNonBlocking',
    relativeLinkResolution: 'legacy'
})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
