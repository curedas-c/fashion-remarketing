import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isButtonDisabled = false;
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';

  private unsubscribe$ = new Subject();
  constructor(private fb: FormBuilder, private auth: AuthService, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm() {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.email]],
    });
  }

  getPassword() {
    this.switchButtonState();
    this.auth
      .forgotPassword(this.loginForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          this.snackBar.open(`Veuillez Consulter vos mails pour récuperer votre nouveau mot de passe`, 'Fermer', {
            horizontalPosition: this.horizontalPosition
          });
        },
        (complete) => {
          this.switchButtonState();
        }
      );
  }

  switchButtonState() {
    this.isButtonDisabled = !this.isButtonDisabled;
  }
}
