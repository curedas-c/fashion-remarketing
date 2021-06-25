import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ApiService } from '@core/services/api.service';

import { ForgotPasswordCredentials } from '@shared/models/auth/forgotPasswordCredentials.model';
import { ResetPasswordCredentials } from '@shared/models/auth/resetPasswordCredentials.model';
import { LoginCredentials } from '@shared/models/auth/loginCredentials.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authEndpoint = {
    login: 'auth/login',
    forgotPassword: 'auth/password/forgot',
    resetPassword: 'auth/password/reset',
    logout: 'auth/logout'
  };

  constructor(private _apiService: ApiService) {}

  public login(data: LoginCredentials, params?: any): Observable<any> {
    return this._apiService.post(`${this.authEndpoint.login}`, data, params).pipe(
      map((response: any) => response.data),
      catchError(error => throwError(error))
    );
  }

  public logout(params?: any): Observable<any> {
    return this._apiService.post(`${this.authEndpoint.logout}`, params).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }

  public forgotPassword(data: ForgotPasswordCredentials): Observable<any> {
    return this._apiService.post(`${this.authEndpoint.forgotPassword}`, data).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }

  public resetPassword(data: ResetPasswordCredentials): Observable<any> {
    return this._apiService.post(`${this.authEndpoint.resetPassword}`, data).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }
}
