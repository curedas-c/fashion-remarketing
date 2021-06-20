import { Validators } from '@angular/forms';
import {
  AbstractControlOptions,
  FormControl,
  FormGroup,
  ValidatorFn,
} from '@angular/forms';

export const removeControls = (
  form: FormGroup,
  controlNames: string[],
  isWhiteList: boolean = false
): FormGroup => {
  // remove control if it doesn't appear in the list
  if (isWhiteList) {
    Object.keys(form.controls).forEach(control => {
      if (!controlNames.includes(control)) {
        form.removeControl(control);
      }
    });
  }
  else {
    controlNames.forEach((control) => {
      if (form.controls[control]) {
          form.removeControl(control);
        }
    });
  }
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
