import { Injectable } from '@angular/core';
import { ApiService } from '@services/api.service';
import { ForgotPasswordCredentials } from '@shared/models/auth/forgotPasswordCredentials.model';
import { LoginCredentials } from '@shared/models/auth/loginCredentials.model';
import { ResetPasswordCredentials } from '@shared/models/auth/resetPasswordCredentials.model';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
/**
   * Auth Endpoint
   */
  private authEndpoint = {
    login: 'auth/sign-in',
    forgotPassword: 'auth/password/forgot/request',
    resetPassword: 'auth/password/reset',
    logout: 'auth/password/forgot/confirm',
    confirmation: 'auth/confirmation-tokens'
  };

  /**
   * Auth Service constructor
   */
  constructor(private apiService: ApiService) {}
  /**
   * Login
   */
  public login(credentials: LoginCredentials, params?: any): Observable<any> {
    return this.apiService.post(`${this.authEndpoint.login}`, credentials, params).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }

  /**
   * Logout
   */
  public logout(params?: any): Observable<any> {
    return this.apiService.post(`${this.authEndpoint.logout}`, params).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }

  /**
   * Reset Password
   */
  public forgotPassword(credentials: ForgotPasswordCredentials): Observable<any> {
    return this.apiService.post(`${this.authEndpoint.forgotPassword}`, credentials).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }

  /**
   * Change password
   */
  public resetPassword(credentials: ResetPasswordCredentials): Observable<any> {
    return this.apiService.post(`${this.authEndpoint.resetPassword}`, credentials).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }

  /**
   * Confirm account
   */
  public confirmActivation(token: string): Observable<any> {
    return this.apiService.get(`${this.authEndpoint.confirmation}/${token}`).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }

  /**
   * Confirm account
   */
  public createCredential(token: string, putContent: any): Observable<any> {
    return this.apiService.put(`${this.authEndpoint.confirmation}/${token}`, putContent).pipe(
      map((response: any) => response),
      catchError(error => throwError(error))
    );
  }
}
