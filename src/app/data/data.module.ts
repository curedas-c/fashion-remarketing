import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DataComponent } from './data.component';
import { ContactDataComponent } from './contact-data/contact-data.component';
import { NotificationDataComponent } from './notification-data/notification-data.component';

import { DataRoutingModule } from './data-routing.module';
import { MatTabsModule } from '@angular/material/tabs';
import { SharedModule } from '@shared/modules/shared.module';
import { MatExpansionModule } from '@angular/material/expansion';
@NgModule({
  declarations: [DataComponent, ContactDataComponent, NotificationDataComponent],
  imports: [
    CommonModule,
    DataRoutingModule,
    MatTabsModule,
    SharedModule,
    MatExpansionModule
  ]
})
export class DataModule { }
