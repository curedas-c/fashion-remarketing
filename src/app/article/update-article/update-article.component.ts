import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ArticleService } from '../shared/article.service';
import { ArticleCategoryService } from 'src/app/article-category/shared/services/article-category.service';

import { Subject } from 'rxjs';
import {
  finalize,
  takeUntil,
} from 'rxjs/operators';

import { Article } from '@shared/models/article/article.model';
import { addControl, removeControls } from '@shared/utils/formGroupModifier';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

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
    private categoryService: ArticleCategoryService
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

  removeControl() {
    this.defaultForm = removeControls(this.defaultForm, ['images']);
  }

  addControl() {
    this.defaultForm = addControl(this.defaultForm, 'images');
  }

  get haveImageField() {
    return this.defaultForm.controls.images;
  }
}
