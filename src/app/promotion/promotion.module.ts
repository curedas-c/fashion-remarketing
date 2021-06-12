import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PromotionRoutingModule } from './promotion-routing.module';
import { PromotionComponent } from './promotion.component';
import { CreatePromotionComponent } from './create-promotion/create-promotion.component';
import { ListPromotionComponent } from './list-promotion/list-promotion.component';
import { UpdatePromotionComponent } from './update-promotion/update-promotion.component';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@shared/modules/shared.module';
import { TableModule } from '@shared/modules/table.module';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatChipsModule } from '@angular/material/chips';


@NgModule({
  declarations: [PromotionComponent, CreatePromotionComponent, ListPromotionComponent, UpdatePromotionComponent],
  imports: [
    CommonModule,
    PromotionRoutingModule,
    MatTabsModule,
    SharedModule,
    TableModule,
    MatDialogModule,
    MatChipsModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] },
    // ...
  ]
})
export class PromotionModule { }
