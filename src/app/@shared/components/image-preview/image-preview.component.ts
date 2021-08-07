import { Component, Input, OnInit } from '@angular/core';
import { NgxDropzonePreviewComponent } from 'ngx-dropzone';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'image-preview',
  templateUrl: './image-preview.component.html',
  styleUrls: ['./image-preview.component.scss'],
  providers: [
    {
      provide: NgxDropzonePreviewComponent,
      useExisting: ImagePreviewComponent
    },
  ],
})
export class ImagePreviewComponent extends NgxDropzonePreviewComponent implements OnInit {
  public srcImage: any;
  @Input() showRemove: boolean = true;
  @Input() imageUrl: string;
  constructor(sanitizer: DomSanitizer) {
    super(sanitizer);
  }

  ngOnInit() {
    if (!this.file) {
      return;
    }
    const reader = new FileReader();

    reader.addEventListener(
      'load',() => {this.srcImage = reader.result}, false);

    if (this.file) {
      reader.readAsDataURL(this.file);
    }

    console.log(this.file);
  }
}
