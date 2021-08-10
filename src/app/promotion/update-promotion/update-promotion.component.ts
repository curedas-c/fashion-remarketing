import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '@environments/environment';

import { Subject, Observable } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { removeControls, addControl } from '@shared/utils/formGroupModifier';

import { PromotionService } from '../shared/services/promotion.service';
import { Promotion } from '@shared/models/promo/promo.model';
import { ImageCompressService } from '@core/services/image-compress.service';

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
  minDate = new Date();
  private unsubscribe$ = new Subject();

  constructor(
    public dialogRef: MatDialogRef<UpdatePromotionComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private promoService: PromotionService,
    private compressor: ImageCompressService
  ) {
    this.currentPromotion = this.data.currentPromotion;
    // const items = this.currentPromotion.category ? this.currentPromotion.category : this.currentPromotion.articles;
    // this.targetList = items;
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
      endDate: [new Date(this.currentPromotion.endDate), [Validators.required]],
    });
  }

  initItemsForm() {
    this.itemsForm = this.fb.group({
      target: ['', [Validators.required]],
      discountOn: ['', [Validators.required]],
    });
    this.listenToControlsChanges();
    const target = this.currentPromotion.category ? 'category' : 'article';
    const discountOn = this.currentPromotion.percentage ? 'percentage' : 'price';
    this.itemsForm.controls.target.patchValue(target);
    this.itemsForm.controls.discountOn.patchValue(discountOn);
  }

  listenToControlsChanges() {
    // this.itemsForm.controls.target.valueChanges
    //   .pipe(takeUntil(this.unsubscribe$))
    //   .subscribe((value) => {
    //     if (value === 'article') {
    //       this.itemsForm = removeControls(this.itemsForm, ['category']);
    //       this.itemsForm = addControl(this.itemsForm, 'articles');
    //       this.targetList$ = this.articleService.getAllItems();
    //     } else if (value === 'category') {
    //       this.itemsForm = removeControls(this.itemsForm, ['articles']);
    //       this.itemsForm = addControl(this.itemsForm, 'category');
    //       this.targetList$ = this.categoryService.getAllItems();
    //     }
    //   });

    this.itemsForm.controls.discountOn.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((value) => {
        if (value === 'price') {
          this.itemsForm = removeControls(this.itemsForm, [
            'percentage',
          ]);
          this.itemsForm = addControl(this.itemsForm, 'fixedPrice');
          this.itemsForm.controls.fixedPrice.patchValue(this.currentPromotion.fixedPrice);
        } else if (value === 'percentage') {
          this.itemsForm = removeControls(this.itemsForm, ['fixedPrice']);
          this.itemsForm = addControl(this.itemsForm, 'percentage');
          this.itemsForm.controls.percentage.patchValue(this.currentPromotion.percentage);
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
      .setItem(formGroups, this.currentPromotion._id)
      .pipe(takeUntil(this.unsubscribe$), finalize(() => { this.switchButtonState() }))
      .subscribe(
        (res) => {
          this.dialogRef.close(true);
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
      this.itemsForm.controls.articles.patchValue(this.targetList);
    } else {
      this.itemsForm.controls.category.patchValue(this.targetList);
    }
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

  get percentageChosen() {
    const discountType = this.itemsForm.controls.discountOn.value;
    return discountType && discountType === 'percentage';
  }

  get priceChosen() {
    const discountType = this.itemsForm.controls.discountOn.value;
    return discountType && discountType === 'price';
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

}
