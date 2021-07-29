import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { mergeMap, tap, catchError } from 'rxjs/operators';
import { CookiesService } from '../services/cookies.service';
import { MatSnackBar, MatSnackBarHorizontalPosition } from '@angular/material/snack-bar';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  constructor(private cookies: CookiesService, private snackBar: MatSnackBar) {}
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return this.cookies.getCookie('credentials').pipe(
      mergeMap((credential) => {
        const access_token = credential ? `Bearer ${credential.access_token}` : '';
        const isPUT = req.method === 'PUT';
        const isPOSTOrPUT = req.method === 'POST' || req.method === 'PUT';

        const modifiedReq = req.clone({
          params: isPUT
            ? req.params.append('responseType', 'text')
            : req.params,
          headers: req.headers
            .set('Authorization', access_token)
            // .set('Content-Type', 'application/json')
            .set(
              'Accept',
              isPOSTOrPUT ? 'multipart/form-data' : 'application/json'
            )
            .set('Access-Control-Allow-Origin', '*')
        });

        return next.handle(modifiedReq).pipe(
          tap((data:any) => {
            const body = data?.body;
            if (body?.message) {
              this.snackBar.open(body.message || 'Action éffectuée !', 'Fermer', {
                duration: 4000,
                horizontalPosition: this.horizontalPosition,
                panelClass: 'popup-success'
              });
            }
          }),
          catchError((error) => {
            return throwError(error);
          })
        );
      })
    );
  }
}
