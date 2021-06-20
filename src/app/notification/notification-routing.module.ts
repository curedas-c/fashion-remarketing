import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotificationComponent } from './notification.component';

const routes: Routes = [{
  path: '', redirectTo: 'create'
},
{
  path: 'create', component: NotificationComponent 
},
{
  path: 'list', component: NotificationComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NotificationRoutingModule { }
