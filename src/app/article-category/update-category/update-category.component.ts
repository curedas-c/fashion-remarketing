import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


import { CurrentDataStateService } from '@core/services/current-data-state.service';
import { ArticleCategoryService } from '../shared/services/article-category.service';

import { Subject, Observable } from 'rxjs';
import { takeUntil, map } from 'rxjs/operators';

import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';

import { ArticleCategory } from '@shared/models/articleCategory.model';

@Component({
  selector: 'app-update-category',
  templateUrl: './update-category.component.html',
  styleUrls: ['./update-category.component.scss'],
})
export class UpdateCategoryComponent implements OnInit, OnDestroy {
  currentArticleCategory: ArticleCategory;
  uuid: string | number;
  fetchError = false;

  defaultForm: FormGroup = new FormGroup({});
  stepperOrientation: Observable<StepperOrientation>;
  private unsubscribe$ = new Subject();

  constructor(
    private currentData: CurrentDataStateService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private dataService: ArticleCategoryService,
    private fb: FormBuilder, breakpointObserver: BreakpointObserver
  ) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.currentData.articleCategory$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        if (data) {
          this.currentArticleCategory = data;
          console.log(data)
          this.initDefaultForm();
        } else {
          this.uuid = this.activatedRoute.snapshot.paramMap.get('uuid');
          if (this.uuid) {
            this.getData();
          } else {
            this.router.navigateByUrl(`/dashboard/article-category/list`);
          }
        }
      });
  }

  initDefaultForm() {
    this.defaultForm = this.fb.group({
      label: [this.currentArticleCategory.label, [Validators.required]],
      main_image: ['', [Validators.required]],
      description: [this.currentArticleCategory.description, [Validators.required]]
    });
  }

  getData() {
    this.dataService
      .getItem(this.uuid)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((data) => {
        if (data) {
          this.currentArticleCategory = data;
          this.initDefaultForm();
        }
        else {
          this.fetchError = true;
        }
      });
  }

  retryFetch() {
    this.fetchError = false;
    this.getData();
  }

  updateItem() {
    this.defaultForm.value;
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
