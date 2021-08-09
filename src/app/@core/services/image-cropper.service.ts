import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CropperDialogComponent } from '@shared/components/cropper-dialog/cropper-dialog.component';

@Injectable()
export class ImageCropperService {

  constructor(public dialog: MatDialog,) { }

  openCropper(file: File, aspectRatio: number) {
    const dialogRef = this.dialog.open(CropperDialogComponent, {
      width: '400px',
      maxHeight: '90vh',
      hasBackdrop: false,
      disableClose: false,
      data: { file, aspectRatio }
    });

    return dialogRef.afterClosed();
  }
}
