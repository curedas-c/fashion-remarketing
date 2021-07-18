import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { CookiesService } from '@core/services/cookies.service';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  loginForm: FormGroup;
  isButtonDisabled = false;

  private unsubscribe$ = new Subject();
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cookie: CookiesService,
    private snackBar: MatSnackBar
  ) {}

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
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.switchButtonState();
    this.auth
      .login(this.loginForm.value)
      .pipe(takeUntil(this.unsubscribe$), finalize(() => { this.switchButtonState() }))
      .subscribe(
        (res) => {
          if (res.paymentDueDate) {
            this.snackBar.open(`Votre abonnement prend fin le: ${res.paymentDueDate}`, 'Fermer', {
              horizontalPosition: this.horizontalPosition,
              panelClass: 'popup-danger'
            });
          }
          this.cookie
            .setCookie('credentials', {...res})
            .subscribe(() => {
              this.router.navigate(['/']);
            });
        }
      );
  }

  switchButtonState() {
    this.isButtonDisabled = !this.isButtonDisabled;
  }
}
