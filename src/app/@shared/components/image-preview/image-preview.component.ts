import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgxDropzonePreviewComponent } from 'ngx-dropzone';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageCropperService } from '@core/services/image-cropper.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
  providers: [
    {
      provide: NgxDropzonePreviewComponent,
      useExisting: ImagePreviewComponent,
    },
  ],
})
export class ImagePreviewComponent
  extends NgxDropzonePreviewComponent
  implements OnInit
{
  public srcImage: any;
  @Input() showRemove: boolean = true;
  @Input() imageUrl: string;
  @Input() aspectRatio: number = 1 / 1;
  @Output() onCrop = new EventEmitter<any>();

  private unsubscribe$ = new Subject();
  constructor(sanitizer: DomSanitizer, private cropper: ImageCropperService) {
    super(sanitizer);
  }

  ngOnInit() {
    if (!this.file) {
      return;
    }
    const reader = new FileReader();

    reader.addEventListener(
      'load',
      () => {
        this.srcImage = reader.result;
      },
      false
    );

    if (this.file) {
      reader.readAsDataURL(this.file);
    }
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  crop() {
    this.cropper
      .openCropper(this.file, this.aspectRatio)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((file) => {
        if (file) {
          this.onCrop.emit(file);
        }
      });
  }
}
