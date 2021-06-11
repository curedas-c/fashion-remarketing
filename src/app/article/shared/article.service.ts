import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ApiService } from '@core/services/api.service';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { DataTable } from '@shared/models/table/dataTable.model';
import { FileInput } from 'ngx-material-file-input';
import { Article } from '@shared/models/article/article.model';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private endpoints = {
    article: 'article',
    articleDeletion: 'article/delete'
  };
  constructor(private _apiService: ApiService) { }

  getTableData(params?: any): Observable<DataTable<Article>> {
    return this._apiService
      .get(`${this.endpoints.article}`, params)
      .pipe(
        map((response: any) => {
          const mapped: Article[] = response.items.map((res) => {
            return new Article(res);
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

  getItem(uuid: string | number, params?: any): Observable<Article> {
    return this._apiService
      .get(`${this.endpoints.article}/${uuid}`, params)
      .pipe(
        map((response: any) => {
          return new Article(response.data);
        }),
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error);
        })
      );
  }

  setItem(item: FormGroup, uuid?: string | number, params?: any): Observable<Article> {
    let formData = new FormData();

    Object.keys(item.controls).forEach(key => {
      const value = item.controls[key].value;
      if (value.constructor === FileInput) {
        formData.append(key, value.files[0]);
      } else {
        formData.append(key, value);
      }
    });

    const url = !!uuid ? `${this.endpoints.article}/${uuid}` : `${this.endpoints.article}`;

    const request = !!uuid ? this._apiService.put(url, formData, params) : this._apiService.post(url, formData, params);

    return request.pipe(
      map((response: any) => response.data),
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error);
      })
    );
  }

  deleteItem(uuid?: string[] | number []): Observable<any> {
    return this._apiService.post(`${this.endpoints.articleDeletion}`, uuid).pipe(
      map((response: any) => response.data),
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error);
      })
    );
  }
}
