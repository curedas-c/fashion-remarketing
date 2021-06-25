import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';
import { CookiesService } from '@core/services/cookies.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  isButtonDisabled = false;

  private unsubscribe$ = new Subject();
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private cookie: CookiesService
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
      userName: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    this.switchButtonState();
    this.auth
      .login(this.loginForm.value)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          this.cookie
            .setCookie('credentials', res.credentials)
            .subscribe(() => {
              this.router.navigate(['/']);
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
