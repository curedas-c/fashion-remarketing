import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { FileInput } from 'ngx-material-file-input';
import { AppSettings } from '@shared/models/data/appSettings.model';

@Injectable({
  providedIn: 'root',
})
export class AppDataService {
  private endpoints = {
    appData: 'app-data'
  };
  constructor(private _apiService: ApiService) {}

  getSettings(params?: any): Observable<AppSettings> {
    return this._apiService
      .get(`${this.endpoints.appData}`, params)
      .pipe(
        map((response: any) => {
          return new AppSettings(response.data);
        }),
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error);
        })
      );
  }

  setItem(item: FormGroup, params?: any): Observable<AppSettings> {
    let formData = new FormData();

    Object.keys(item.controls).forEach((key) => {
      const value = item.controls[key].value;
      if (value.constructor === FileInput) {
        formData.append(key, value.files[0]);
      } else {
        formData.append(key, value);
      }
    });

    const url = `${this.endpoints.appData}`;

    return this._apiService.post(url, formData, params).pipe(
      map((response: any) => response.data),
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error);
      })
    );
  }
}
