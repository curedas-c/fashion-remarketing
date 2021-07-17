import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';


import { Promotion } from '@shared/models/promo/promo.model';
import { DataTable } from '@shared/models/table/dataTable.model';
import { FormGroup } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';

@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  private endpoints = {
    promo: 'promotion'
  };
  constructor(private _apiService: ApiService) { }

  getTableData(params?: any): Observable<DataTable<Promotion>> {
    return this._apiService
      .get(`${this.endpoints.promo}`, params)
      .pipe(
        map((response: any) => {
          const mapped: Promotion[] = response.items.map((res) => {
            return new Promotion(res);
          });

          return {
            items: mapped,
            total_count: response.total_count,
          };
        }),
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error);
        })
      );
  }

  getItem(uuid: string | number, params?: any): Observable<Promotion> {
    return this._apiService
      .get(`${this.endpoints.promo}/${uuid}`, params)
      .pipe(
        map((response: any) => {
          return new Promotion(response.data);
        }),
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error);
        })
      );
  }

  setItem(item: FormGroup, uuid?: string | number, params?: any): Observable<Promotion> {
    let formData = new FormData();

    Object.keys(item.controls).forEach(key => {
      const value = item.controls[key].value;
      if (value.constructor === FileInput) {
        formData.append(key, value.files[0]);
      } else {
        formData.append(key, value);
      }
    });

    const url = !!uuid ? `${this.endpoints.promo}/${uuid}` : `${this.endpoints.promo}`;

    const request = !!uuid ? this._apiService.patch(url, formData, params) : this._apiService.post(url, formData, params);

    return request.pipe(
      map((response: any) => response.data),
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error);
      })
    );
  }

  deleteItem(uuid?: string[] | number []): Observable<any> {
    return this._apiService.delete(`${this.endpoints.promo}`, uuid).pipe(
      map((response: any) => response.data),
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error);
      })
    );
  }

  getAllItems(params?: any): Observable<Promotion[]> {
    return this._apiService
      .get(`${this.endpoints.promo}`, params)
      .pipe(
        map((response: any) => {
          const mapped: Promotion[] = response.items.map((res) => {
            return new Promotion(res);
          });
          
          return mapped || [];
        }),
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error);
        })
      );
  }
}
