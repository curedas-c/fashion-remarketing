import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  constructor(private snackBar: MatSnackBar) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.error) {
          if (error.status === 0) {
            this.snackBar.open(`Une erreur s'est produite ou vous n'avez pas accès à internet`, 'Fermer', {
              duration: 5000,
              horizontalPosition: this.horizontalPosition,
              panelClass: 'popup-danger'
            });
          }
          else {
            this.snackBar.open(error.message, 'Fermer', {
              duration: 5000,
              horizontalPosition: this.horizontalPosition,
              panelClass: 'popup-warn'
            });
          }
        }

        return throwError(error);
      })
    );
  }
}
