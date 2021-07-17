import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTable } from '@shared/models/table/dataTable.model';
import { FileInput } from 'ngx-material-file-input';

import { Notification } from '@shared/models/notification/notification.model';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  private endpoints = {
    notification: 'notification'
  };
  constructor(private _apiService: ApiService) { }

  getTableData(params?: any): Observable<DataTable<Notification>> {
    return this._apiService
      .get(`${this.endpoints.notification}`, params)
      .pipe(
        map((response: any) => {
          const mapped: Notification[] = response.items.map((res) => {
            return new Notification(res);
          });

          return {
            items: mapped,
            total_items: response.total_items,
          };
        }),
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error);
        })
      );
  }

  getItem(uuid: string | number, params?: any): Observable<Notification> {
    return this._apiService
      .get(`${this.endpoints.notification}/${uuid}`, params)
      .pipe(
        map((response: any) => {
          return new Notification(response.data);
        }),
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error);
        })
      );
  }

  setItem(item: FormGroup, uuid?: string | number, params?: any): Observable<Notification> {
    let formData = new FormData();

    Object.keys(item.controls).forEach(key => {
      const value = item.controls[key].value;
      if (value.constructor === FileInput) {
        formData.append(key, value.files[0]);
      } else {
        formData.append(key, value);
      }
    });

    const url = !!uuid ? `${this.endpoints.notification}/${uuid}` : `${this.endpoints.notification}`;

    const request = !!uuid ? this._apiService.patch(url, formData, params) : this._apiService.post(url, formData, params);

    return request.pipe(
      map((response: any) => response.data),
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error);
      })
    );
  }

  deleteItem(uuid?: string[] | number []): Observable<any> {
    return this._apiService.delete(`${this.endpoints.notification}`, uuid).pipe(
      map((response: any) => response.data),
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error);
      })
    );
  }
}
