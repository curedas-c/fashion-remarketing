import { Injectable } from '@angular/core';
import { ApiService } from '@core/services/api.service';
import { Observable, throwError as observableThrowError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

import { ArticleCategory } from '@shared/models/article-category/articleCategory.model';
import { DataTable } from '@shared/models/table/dataTable.model';

@Injectable({
  providedIn: 'root',
})
export class ArticleCategoryService {
  /**
   * Endpoints
   */
  private endpoints = {
    articleCategories: 'article-category',
    articleCategoriesAll: 'article-category/all',
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
      .get(`${this.endpoints.articleCategoriesAll}`, params)
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
}
