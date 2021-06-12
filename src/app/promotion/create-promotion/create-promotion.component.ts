import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { removeControls, addControl } from '@shared/utils/formGroupModifier';

import { PromotionService } from '../shared/services/promotion.service';
import { ArticleCategoryService } from '../../article-category/shared/services/article-category.service';
import { ArticleService } from '../../article/shared/article.service';

@Component({
  selector: 'app-create-promotion',
  templateUrl: './create-promotion.component.html',
  styleUrls: ['./create-promotion.component.scss'],
})
export class CreatePromotionComponent implements OnInit, OnDestroy {
  creationForm: FormGroup;
  itemsForm: FormGroup;
  isButtonDisabled = false;
  targetList$: Observable<any[]>;
  targetList: any[] = [];
  private unsubscribe$ = new Subject();
  constructor(
    private fb: FormBuilder,
    private promoService: PromotionService,
    private categoryService: ArticleCategoryService,
    private articleService: ArticleService,
  ) {}

  ngOnInit(): void {
    this.initCreationForm();
    this.initItemsForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initCreationForm() {
    this.creationForm = this.fb.group({
      label: ['', [Validators.required]],
      main_image: [''],
      discountEndDate: ['', [Validators.required]],
    });
  }

  initItemsForm() {
    this.itemsForm = this.fb.group({
      target: ['', [Validators.required]],
      discountOn: ['', [Validators.required]],
    });

    this.itemsForm.controls.target.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        if (value === 'article') {
          this.itemsForm = removeControls(this.itemsForm, ['categoryIDs']);
          this.itemsForm = addControl(this.itemsForm, 'articleIDs');
          this.targetList$ = this.articleService.getAllItems();
        } else if (value === 'category') {
          this.itemsForm = removeControls(this.itemsForm, ['articleIDs']);
          this.itemsForm = addControl(this.itemsForm, 'categoryIDs');
          this.targetList$ = this.categoryService.getAllItems();
        }
      });

    this.itemsForm.controls.discountOn.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        if (value === 'price') {
          this.itemsForm = removeControls(this.itemsForm, [
            'discountPercentage',
          ]);
          this.itemsForm = addControl(this.itemsForm, 'discountPrice');
        } else if (value === 'percentage') {
          this.itemsForm = removeControls(this.itemsForm, ['discountPrice']);
          this.itemsForm = addControl(this.itemsForm, 'discountPercentage');
        }
      });
  }

  createPromotion() {
    this.switchButtonState();
    const formGroups = this.fb.group({
      ...this.itemsForm.controls,
      ...this.creationForm.controls,
    });
    this.promoService
      .setItem(formGroups)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          console.log(res);
        },
        (complete) => {
          this.switchButtonState();
        }
      );
  }

  isInList(item: any): boolean {
    return this.targetList.includes(item);
  }

  setItem(item: any) {
    if (this.targetList.includes(item)) {
      this.targetList = this.targetList.filter((el) => el !== item);
    } else {
      this.targetList = [...this.targetList, item];
    }
    if (this.itemsForm.controls.target.value === 'article') {
      this.itemsForm.controls.articleIDs.patchValue(this.targetList);
    } else {
      this.itemsForm.controls.categoryIDs.patchValue(this.targetList);
    }
  }

  switchButtonState() {
    this.isButtonDisabled = !this.isButtonDisabled;
  }

  get percentageChosen () {
    const discountType = this.itemsForm.controls.discountOn.value;
    return discountType && discountType === 'percentage';
  }

  get priceChosen () {
    const discountType = this.itemsForm.controls.discountOn.value;
    return discountType && discountType === 'price';
  }
}
