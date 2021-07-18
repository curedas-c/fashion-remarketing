import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { mergeMap, catchError } from 'rxjs/operators';
import { CookiesService } from '../services/cookies.service';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  constructor(private cookies: CookiesService) {}
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
          catchError((error) => {
            return throwError(error);
          })
        );
      })
    );
  }
}
