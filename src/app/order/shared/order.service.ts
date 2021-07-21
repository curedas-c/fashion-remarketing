import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { DataTable } from '@shared/models/table/dataTable.model';
import { Order } from '@shared/models/order/order.model';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private endpoints = {
    order: 'order'
  };
  constructor(private _apiService: ApiService) {}

  getTableData(params?: any): Observable<DataTable<Order>> {
    return this._apiService
      .get(`${this.endpoints.order}`, params)
      .pipe(
        map((response: any) => {
          const mapped: Order[] = response.items.map((res) => {
            return new Order(res);
          });
          console.log('', mapped[0])

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

  getItem(uuid: string | number, params?: any): Observable<Order> {
    return this._apiService
      .get(`${this.endpoints.order}/${uuid}`, params)
      .pipe(
        map((response: any) => {
          return new Order(response.data);
        }),
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error);
        })
      );
  }
}
