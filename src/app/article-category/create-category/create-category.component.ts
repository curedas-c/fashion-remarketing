import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BreakpointObserver } from '@angular/cdk/layout';
import { StepperOrientation } from '@angular/cdk/stepper';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  categoryCreationForm: FormGroup;
  stepperOrientation: Observable<StepperOrientation>;
  
  constructor(private fb: FormBuilder, breakpointObserver: BreakpointObserver) {
    this.stepperOrientation = breakpointObserver
      .observe('(min-width: 800px)')
      .pipe(map(({ matches }) => (matches ? 'horizontal' : 'vertical')));
  }

  ngOnInit(): void {
    this.initCategoryForm();
  }

  initCategoryForm() {
    this.categoryCreationForm = this.fb.group({
      label: ['', [Validators.required]],
      main_image: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  createCategory() {
    console.log(this.categoryCreationForm.value);
  }

}
