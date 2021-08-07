import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { NotificationComponent } from './notification.component';
import { CreateNotificationComponent } from './create-notification/create-notification.component';
import { UpdateNotificationComponent } from './update-notification/update-notification.component';
import { ListNotificationComponent } from './list-notification/list-notification.component';

import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@shared/modules/shared.module';
import { TableModule } from '@shared/modules/table.module';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChipSelectorModule } from '@shared/modules/chip-selector.module';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { PhoneOverviewModule } from '../@shared/modules/phone-overview.module';
import { FileSelectorModule } from '../@shared/modules/file-selector.module';

@NgModule({
  declarations: [NotificationComponent, CreateNotificationComponent, UpdateNotificationComponent, ListNotificationComponent],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    MatTabsModule,
    SharedModule,
    TableModule,
    MatDialogModule,
    MatMenuModule,
    ChipSelectorModule,
    MatSlideToggleModule,
    PhoneOverviewModule,
    FileSelectorModule
  ],
  providers: [
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }
  ]
})
export class NotificationModule { }
