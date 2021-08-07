import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
} from '@angular/core';
import { inOutAnimation } from '@shared/animations/inOutAnimation';
import { FilePickerComponent } from 'ngx-awesome-uploader';
import { ImageCroppedEvent, ImageCropperComponent, LoadedImage } from 'ngx-image-cropper';

@Component({
  selector: 'file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss'],
  animations: [inOutAnimation],
})
export class FileSelectorComponent implements OnInit {
  @Input() maxSize: number = 2000000;
  @Input() maxCount: number = 2;
  @Input() multiple: boolean = false;
  @Input() accept: string = 'image/jpeg,image/jpg,image/png';
  @Input() defaultFiles: string[];
  @Input() aspectRatio: number = 1/1;

  @Output() onFileChange = new EventEmitter<any>();
  @ViewChild(ImageCropperComponent) imageCropper: ImageCropperComponent;

  files: File[] = [];
  showPreview = false;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  constructor() {}

  ngOnInit(): void {
    if (this.defaultFiles && this.defaultFiles?.length > 0) {
      this.showPreview = true;
    }
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.fileChangeEvent(event);
    this.onFileChange.emit(event.addedFiles)
  }

  onDelete(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.onFileChange.emit(this.files)
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }

  addFile() {
    this.showPreview = false;
  }

  // cropper events
  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded(image: LoadedImage) {
    this.imageCropper.crop()
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }
}
