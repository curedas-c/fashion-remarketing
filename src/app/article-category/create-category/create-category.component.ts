import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '@environments/environment';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { ArticleCategoryService } from '../shared/services/article-category.service';
import { MatStepper } from '@angular/material/stepper';
import { ImageCompressService } from '@core/services/image-compress.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit, OnDestroy {
  @ViewChild('stepper') private stepper: MatStepper;
  categoryCreationForm: FormGroup;
  stepperOrientation: Observable<StepperOrientation>;
  isButtonDisabled = false;
  private unsubscribe$ = new Subject();
  
  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver, private categoryService: ArticleCategoryService,
    private compressor: ImageCompressService) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.initCategoryForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initCategoryForm() {
    this.categoryCreationForm = this.fb.group({
      label: ['', [Validators.required]],
      main_image: [''],
      description: ['', [Validators.required]]
    });
  }

  createCategory() {
    this.switchButtonState();
    this.categoryService
      .setItem(this.categoryCreationForm)
      .pipe(takeUntil(this.unsubscribe$), finalize(() => { this.switchButtonState() }))
      .subscribe(
        (res) => {
          if (this.stepper.selectedIndex === 0) {
            this.stepper.next();
          }
        }
      );
  }

  switchButtonState() {
    this.isButtonDisabled = !this.isButtonDisabled;
  }

  async setFiles(files: File[]) {
    if (files) {
      const minifiedFile = await this.compressor.compressFile(files[0]);
      this.categoryCreationForm.controls.main_image.patchValue(minifiedFile || files[0]);
    }
  }
}
