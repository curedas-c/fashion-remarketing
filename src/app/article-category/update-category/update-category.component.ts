import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@environments/environment';

import { ArticleCategoryService } from '../shared/services/article-category.service';

import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

import { ArticleCategory } from '@shared/models/article-category/articleCategory.model';
import { ImageCompressService } from '@core/services/image-compress.service';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss'],
})
export class UpdateCategoryComponent implements OnInit, OnDestroy {
  currentArticleCategory: ArticleCategory;
  isButtonDisabled = false;
  defaultForm: FormGroup = new FormGroup({});
  private unsubscribe$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<UpdateCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dataService: ArticleCategoryService,
    private fb: FormBuilder,
    private compressor: ImageCompressService
  ) {
    this.currentArticleCategory = this.data.currentCategory;
  }

  ngOnInit(): void {
    this.initDefaultForm();
  }

  initDefaultForm() {
    this.defaultForm = this.fb.group({
      label: [this.currentArticleCategory.label, [Validators.required]],
      main_image: [this.currentArticleCategory.main_image],
      description: [this.currentArticleCategory.description, [Validators.required]]
    });
  }

  updateItem() {
    this.switchButtonState();
    this.dataService
      .setItem(this.defaultForm, this.currentArticleCategory._id)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.switchButtonState();
        })
      )
      .subscribe((res) => {
        this.dialogRef.close(true);
      });
  }

  switchButtonState() {
    this.isButtonDisabled = !this.isButtonDisabled;
  }

  async setFiles(files: File[]) {
    if (files[0]) {
      const minifiedFile = await this.compressor.compressFile(files[0]);
      this.defaultForm.controls.main_image.patchValue(minifiedFile || files[0]);
    }
  }

  get defaultImage() {
    const urls = this.defaultForm.controls.main_image?.value;
    if (urls?.constructor === Array) {
      const images = urls.map(url => {
        return `${environment.rootUrl}/${url}`
      });
      return images || null;
    }
    return urls ? [`${environment.rootUrl}/${urls}`] : null;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
