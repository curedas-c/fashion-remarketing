import { Injectable } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
} from '@angular/material/snack-bar';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookiesService } from '../services/cookies.service';

@Injectable({
  providedIn: 'root',
})
export class PaymentGuard implements CanActivate {
  horizontalPosition: MatSnackBarHorizontalPosition = 'center';
  constructor(
    private cookie: CookiesService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.cookie.getCookie('credentials').pipe(
      map((res) => {
        if (!res || !res.havePaid) {
          this.snackBar.open(
            `Veuillez régulariser votre paiement pour effectuer cette action`,
            'Fermer',
            {
              horizontalPosition: this.horizontalPosition,
            }
          );

          this.router.navigate(['/']);
        }
        return true;
      })
    );
  }
}
