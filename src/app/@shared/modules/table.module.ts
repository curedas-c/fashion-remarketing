import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableComponent } from '@shared/components/table/table.component';
import { MatSortModule } from '@angular/material/sort';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CustomPipesModule } from './custom-pipes.module';

const IMPORTS = [
  MatIconModule,
  MatButtonModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatSortModule,
  MatTableModule, 
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatCheckboxModule,
  CustomPipesModule
];
@NgModule({
  declarations: [TableComponent],
  imports: [CommonModule, ...IMPORTS],
  exports: [...IMPORTS, TableComponent],
  providers: [],
})
export class TableModule {}
