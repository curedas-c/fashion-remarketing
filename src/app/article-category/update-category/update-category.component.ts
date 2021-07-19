import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ArticleCategoryService } from '../shared/services/article-category.service';

import { Subject } from 'rxjs';
import { takeUntil, finalize } from 'rxjs/operators';

import { ArticleCategory } from '@shared/models/article-category/articleCategory.model';

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
    private fb: FormBuilder
  ) {
    this.currentArticleCategory = this.data.currentCategory;
  }

  ngOnInit(): void {
    this.initDefaultForm();
  }

  initDefaultForm() {
    this.defaultForm = this.fb.group({
      label: [this.currentArticleCategory.label, [Validators.required]],
      main_image: [''],
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
        console.log(res);
      });
  }

  switchButtonState() {
    this.isButtonDisabled = !this.isButtonDisabled;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
