import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';
import { inOutAnimation } from '@shared/animations/inOutAnimation';

@Component({
  selector: 'file-selector',
  templateUrl: './file-selector.component.html',
  styleUrls: ['./file-selector.component.scss'],
  animations: [inOutAnimation],
})
export class FileSelectorComponent implements OnInit {
  @Input() maxSize: number = 2000000;
  @Input() maxCount: number = 1;
  @Input() multiple: boolean = true;
  @Input() accept: string = 'image/jpeg,image/jpg,image/png';
  @Input() defaultFiles: string[];
  @Input() aspectRatio: number = 1/1;

  @Output() onFileChange = new EventEmitter<any>();

  files: File[] = [];
  formattedFiles: File[] = [];
  showPreview = false;
  disabled = false;
  constructor() {}

  ngOnInit(): void {
    if (this.defaultFiles && this.defaultFiles?.length > 0) {
      this.showPreview = true;
    }
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.formattedFiles.push(...event.addedFiles);
    this.emitFiles();
    this.updateStatus();
  }

  onDelete(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.formattedFiles.splice(this.files.indexOf(event), 1);
    this.emitFiles();
    this.updateStatus();
  }

  onCrop(event: any, index: any) {
    this.formattedFiles[index] = event;
    this.emitFiles();
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.files, event.previousIndex, event.currentIndex);
  }

  emitFiles() {
    this.onFileChange.emit(this.formattedFiles);
  }

  addFile() {
    this.showPreview = false;
  }

  updateStatus() {
    this.files.length >= this.maxCount ? this.disabled = true : this.disabled = false;
    if (this.files.length > this.maxCount) {
      do {
        this.files.pop();
        this.formattedFiles.pop();
      } while (this.files.length > this.maxCount);
    }
  }
}
