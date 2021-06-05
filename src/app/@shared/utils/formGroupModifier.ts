import { Validators } from '@angular/forms';
import {
  AbstractControlOptions,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

export const removeControls = (
  form: FormGroup,
  controlNames: string[]
): FormGroup => {
  controlNames.forEach((control) => {
    if (form.controls[control]) {
        form.removeControl(control);
      }
  });
  return form;
};

export const addControl = (
  form: FormGroup,
  controlName: string,
  validators: ValidatorFn | ValidatorFn[] | AbstractControlOptions = [
    Validators.required,
  ],
  defaultValue = null
): FormGroup => {
  if (!form.controls.controlName) {
    form.addControl(controlName, new FormControl(defaultValue, validators));
  }
  return form;
};
