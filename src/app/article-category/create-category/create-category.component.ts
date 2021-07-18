import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable, Subject } from 'rxjs';
import { finalize, map, takeUntil } from 'rxjs/operators';
import { ArticleCategoryService } from '../shared/services/article-category.service';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit, OnDestroy {
  categoryCreationForm: FormGroup;
  stepperOrientation: Observable<StepperOrientation>;
  isButtonDisabled = false;
  private unsubscribe$ = new Subject();
  
  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver, private categoryService: ArticleCategoryService) {
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
          console.log(res);
        }
      );
  }

  switchButtonState() {
    this.isButtonDisabled = !this.isButtonDisabled;
  }

}
