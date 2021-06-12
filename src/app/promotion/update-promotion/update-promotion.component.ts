import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { removeControls, addControl } from '@shared/utils/formGroupModifier';

import { PromotionService } from '../shared/services/promotion.service';
import { ArticleCategoryService } from '../../article-category/shared/services/article-category.service';
import { ArticleService } from '../../article/shared/article.service';
import { Promotion } from '../../@shared/models/promo/promo.model';

@Component({
  selector: 'app-update-promotion',
  templateUrl: './update-promotion.component.html',
  styleUrls: ['./update-promotion.component.scss']
})
export class UpdatePromotionComponent implements OnInit, OnDestroy {

  currentPromotion: Promotion;

  defaultForm: FormGroup;
  itemsForm: FormGroup;
  isButtonDisabled = false;
  targetList$: Observable<any[]>;
  targetList: any[] = [];
  private unsubscribe$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<UpdatePromotionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private promoService: PromotionService,
    private categoryService: ArticleCategoryService,
    private articleService: ArticleService
  ) {
    this.currentPromotion = this.data.currentPromotion;
    const items = this.currentPromotion.categoryIDs ? this.currentPromotion.categoryIDs : this.currentPromotion.articleIDs;
    this.targetList = items;
  }

  ngOnInit(): void {
    this.initDefaultForm();
    this.initItemsForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initDefaultForm() {
    this.defaultForm = this.fb.group({
      label: [this.currentPromotion.label || '', [Validators.required]],
      main_image: [''],
      discountEndDate: [new Date(this.currentPromotion.discountEndDate), [Validators.required]],
    });
  }

  initItemsForm() {
    this.itemsForm = this.fb.group({
      target: ['', [Validators.required]],
      discountOn: ['', [Validators.required]],
    });
    this.listenToControlsChanges();
    const target = this.currentPromotion.categoryIDs ? 'category' : 'article';
    const discountOn = this.currentPromotion.discountPercentage ? 'percentage' : 'price';
    this.itemsForm.controls.target.patchValue(target);
    this.itemsForm.controls.discountOn.patchValue(discountOn);
  }

  listenToControlsChanges() {
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
          this.itemsForm.controls.discountPrice.patchValue(this.currentPromotion.discountPrice);
        } else if (value === 'percentage') {
          this.itemsForm = removeControls(this.itemsForm, ['discountPrice']);
          this.itemsForm = addControl(this.itemsForm, 'discountPercentage');
          this.itemsForm.controls.discountPercentage.patchValue(this.currentPromotion.discountPercentage);
        }
      });
  }

  updatePromotion() {
    this.switchButtonState();
    const formGroups = this.fb.group({
      ...this.itemsForm.controls,
      ...this.defaultForm.controls,
    });
    this.promoService
      .setItem(formGroups, this.currentPromotion.id)
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

  get percentageChosen() {
    const discountType = this.itemsForm.controls.discountOn.value;
    return discountType && discountType === 'percentage';
  }

  get priceChosen() {
    const discountType = this.itemsForm.controls.discountOn.value;
    return discountType && discountType === 'price';
  }

}
