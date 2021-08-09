import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';

@Component({
  selector: 'app-cropper-dialog',
  templateUrl: './cropper-dialog.component.html',
  styleUrls: ['./cropper-dialog.component.scss'],
})
export class CropperDialogComponent implements OnInit {
  file: File;
  croppedImage: any = '';
  aspectRatio: number = 1 / 1;
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;
  constructor(
    public dialogRef: MatDialogRef<CropperDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.file = this.data.file;
    this.aspectRatio = this.data.aspectRatio;
  }

  ngOnInit(): void {}

  close() {
    const newImage = new File([this.croppedImage], this.file.name, {
      lastModified: new Date().getTime(),
      type: this.file.type
    });
    this.dialogRef.close(newImage || this.file);
  }

  cancel() {
    this.dialogRef.close(null);
  }

  // cropper events
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
}
