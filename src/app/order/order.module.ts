import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { ListOrderComponent } from './list-order/list-order.component';
import { OrderComponent } from './order.component';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TableModule } from '@shared/modules/table.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@shared/modules/shared.module';
import { DetailOrderComponent } from './detail-order/detail-order.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CustomPipesModule } from '@shared/modules/custom-pipes.module';


@NgModule({
  declarations: [
    ListOrderComponent,
    OrderComponent,
    DetailOrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MatTabsModule,
    SharedModule,
    TableModule,
    MatDialogModule,
    MatExpansionModule,
    CustomPipesModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }
  ]
})
export class OrderModule { }
