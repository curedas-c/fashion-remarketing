import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FileSelectorComponent } from '../components/file-selector/file-selector.component';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ImagePreviewComponent } from '../components/image-preview/image-preview.component';
import { MatCardModule } from '@angular/material/card';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatButtonModule } from '@angular/material/button';
import { ImageCropperModule } from 'ngx-image-cropper';

const IMPORTS = [
  NgxDropzoneModule,
  ImageCropperModule,
  DragDropModule,
  MatCardModule,
  MatButtonModule
];
@NgModule({
  declarations: [FileSelectorComponent, ImagePreviewComponent],
  imports: [CommonModule, ...IMPORTS],
  exports: [...IMPORTS, FileSelectorComponent],
  providers: [],
})
export class FileSelectorModule {}
