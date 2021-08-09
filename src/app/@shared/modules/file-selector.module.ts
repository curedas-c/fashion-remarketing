import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FileSelectorComponent } from '../components/file-selector/file-selector.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImagePreviewComponent } from '../components/image-preview/image-preview.component';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { ImageCropperModule } from 'ngx-image-cropper';
import { CropperDialogComponent } from '@shared/components/cropper-dialog/cropper-dialog.component';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCropperService } from '@core/services/image-cropper.service';

const IMPORTS = [
  NgxDropzoneModule,
  ImageCropperModule,
  DragDropModule,
  MatCardModule,
  MatButtonModule,
];
@NgModule({
  declarations: [
    FileSelectorComponent,
    ImagePreviewComponent,
    CropperDialogComponent,
  ],
  imports: [CommonModule, ...IMPORTS],
  exports: [...IMPORTS, FileSelectorComponent],
  providers: [
    ImageCropperService,
    { provide: MatDialogRef, useValue: {} },
    { provide: MAT_DIALOG_DATA, useValue: [] }
  ],
})
export class FileSelectorModule {}
