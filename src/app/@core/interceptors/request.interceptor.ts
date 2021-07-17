import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class RequestInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // const secureToken = 'bearer-token';
    const isPUT = req.method === 'PUT';
    const isPOST = req.method === 'POST';
    
    const modifiedReq = req.clone({
        params: isPUT ? req.params.append('responseType', 'text') : req.params,
        headers: req.headers
        /* .set('Authorization', `Bearer ${secureToken}`) */
        .set('Content-Type', 'application/json')
        .set('Accept', isPOST ? 'multipart/form-data':'application/json')
        .set('Access-Control-Allow-Origin', '*'),
    });
    return next.handle(modifiedReq);
  }
}
