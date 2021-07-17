import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { ArticleCategory } from '@shared/models/article-category/articleCategory.model';
import { DataTable } from '@shared/models/table/dataTable.model';
import { FormGroup } from '@angular/forms';
import { FileInput } from 'ngx-material-file-input';

@Injectable({
  providedIn: 'root',
})
export class ArticleCategoryService {
  /**
   * Endpoints
   */
  private endpoints = {
    articleCategories: 'article-category'
  };
  constructor(private _apiService: ApiService) {}

  getTableData(params?: any): Observable<DataTable<ArticleCategory>> {
    return this._apiService
      .get(`${this.endpoints.articleCategories}`, params)
      .pipe(
        map((response: any) => {
          console.log(response);
          const mapped: ArticleCategory[] = response.items.map((res) => {
            return new ArticleCategory(res);
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

  getItem(uuid: string | number, params?: any): Observable<ArticleCategory> {
    return this._apiService
      .get(`${this.endpoints.articleCategories}/${uuid}`, params)
      .pipe(
        map((response: any) => {
          return new ArticleCategory(response.data);
        }),
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error);
        })
      );
  }

  getAllItems(params?: any): Observable<ArticleCategory[]> {
    return this._apiService
      .get(`${this.endpoints.articleCategories}`, params)
      .pipe(
        map((response: any) => {
          const mapped: ArticleCategory[] = response.items.map((res) => {
            return new ArticleCategory(res);
          });
          
          return mapped || [];
        }),
        catchError((error: HttpErrorResponse) => {
          return observableThrowError(error);
        })
      );
  }

  setItem(item: FormGroup, uuid?: string | number, params?: any): Observable<ArticleCategory> {
    let formData = new FormData();

    Object.keys(item.controls).forEach(key => {
      const value = item.controls[key].value;
      if (value.constructor === FileInput) {
        formData.append(key, value.files[0]);
      } else {
        formData.append(key, value);
      }
    });

    const url = !!uuid ? `${this.endpoints.articleCategories}/${uuid}` : `${this.endpoints.articleCategories}`;

    const request = !!uuid ? this._apiService.patch(url, formData, params) : this._apiService.post(url, formData, params);

    return request.pipe(
      map((response: any) => response.data),
      catchError((error: HttpErrorResponse) => {
        return observableThrowError(error);
      })
    );
  }

}
