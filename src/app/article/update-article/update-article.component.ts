import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@environments/environment';

import { ArticleService } from '../shared/article.service';
import { ArticleCategoryService } from 'src/app/article-category/shared/services/article-category.service';

import { Subject } from 'rxjs';
import {
  finalize,
  takeUntil,
} from 'rxjs/operators';

import { Article } from '@shared/models/article/article.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ImageCompressService } from '@core/services/image-compress.service';

@Component({
  selector: 'app-update-article',
  templateUrl: './update-article.component.html',
  styleUrls: ['./update-article.component.scss'],
})
export class UpdateArticleComponent implements OnInit, OnDestroy {
  defaultForm: FormGroup = new FormGroup({});
  currentArticle: Article;

  previewVisible = false;
  isButtonDisabled = false;
  categoryList$ = this.categoryService.getAllItems();
  private unsubscribe$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<UpdateArticleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private dataService: ArticleService,
    private categoryService: ArticleCategoryService,
    private compressor: ImageCompressService
  ) {
    this.currentArticle = this.data.currentArticle;
  }

  ngOnInit(): void {
    this.initDefaultForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initDefaultForm() {
    this.defaultForm = this.fb.group({
      label: [this.currentArticle.label, [Validators.required]],
      description: [this.currentArticle.description, [Validators.required]],
      images: [this.currentArticle.images, [Validators.required]],
      category: [this.currentArticle.category, [Validators.required]],
      price: [this.currentArticle.price, [Validators.required]],
    });
  }

  // getData() {
  //   this.dataService
  //     .getItem(this.currentArticle._id)
  //     .pipe(takeUntil(this.unsubscribe$))
  //     .subscribe((data) => {
  //       if (data) {
  //         this.currentArticle = data;
  //         this.initDefaultForm();
  //       }
  //     }, error => {
  //       if(error.status === 404) {
  //         this.router.navigateByUrl(`/dashboard/article/list`);
  //       }
  //       this.fetchError = true;
  //     }, () => {
  //       this.switchButtonState();
  //     });
  // }

  // retryFetch() {
  //   this.fetchError = false;
  //   this.getData();
  // }

  updateItem() {
    this.switchButtonState();
    this.dataService
      .setItem(this.defaultForm, this.currentArticle._id)
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

  switchPreviewVisibility() {
    this.previewVisible = !this.previewVisible;
  }

  switchButtonState() {
    this.isButtonDisabled = !this.isButtonDisabled;
  }

  async setFiles(files: File[]) {
    if (files[0]) {
      const minifiedFile = await this.compressor.compressFile(files[0]);
      this.defaultForm.controls.images.patchValue(minifiedFile || files[0]);
    }
  }

  get defaultImage() {
    const urls = this.defaultForm.controls.images?.value;
    if (urls?.constructor === Array) {
      const images = urls.map(url => {
        return `${environment.rootUrl}/${url}`
      });
      return images || null;
    }
    return urls ? [`${environment.rootUrl}/${urls}`] : null;
  }
}
