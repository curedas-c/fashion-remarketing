import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from '@environments/environment';

const FORBIDDEN_ENDPOINTS = ['/article', '/article-category'];

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  /**
   * 'Default API Url
   */
  private url: string = environment.apiUrl;

  /**
   * Api Service Constructor
   */
  constructor(public http: HttpClient) {}

  /**
   * GET verb action
   */
  get(endpoint: string, params?: any, reqOpts?: any) {
    if (!reqOpts) {
      reqOpts = {
        params: new HttpParams(),
      };
    }

    const URL = this.url + '/' + endpoint;
    const baseUrl = URL.split('?')[0];
    
    const isTableRelatedRequest = FORBIDDEN_ENDPOINTS.some(endpoint => {
      const forbiddenUrl = this.url + endpoint;
      return baseUrl === forbiddenUrl;
    })

    // set custom headers for ngx-loading-bar when request is not related to a Material Table
    if (isTableRelatedRequest) {
      let headers = reqOpts.headers as HttpHeaders;
      if (!headers) {
        headers = new HttpHeaders({ ignoreLoadingBar: '' });
      } else {
        headers.set('ignoreLoadingBar', '');
      }
      reqOpts.headers = headers;
    }

    if (params) {
      reqOpts.params = new HttpParams();
      for (const k in params) {
        if (params.hasOwnProperty(k)) {
          reqOpts.params = reqOpts.params.set(k, params[k]);
        }
      }
    }

    return this.http.get(URL, reqOpts);
  }

  /**
   * POST verb action
   */
  post(endpoint: string, body: any, reqOpts?: any) {
    if (body.images) {
      const formData = new FormData(body);
      const headers = new HttpHeaders({ enctype: 'multipart/form-data', responseType: 'json' });

      body.images.forEach((image, index) => {
        formData.append(`image-${index}`, image);
      });

      return this.http.post(this.url + '/' + endpoint, formData, { headers });
    }
    return this.http.post(this.url + '/' + endpoint, body, reqOpts);
  }

  /**
   * PUT verb action
   */
  put(endpoint: string, body: any, reqOpts?: any) {
    if (body.images) {
      const formData = new FormData(body);
      const headers = new HttpHeaders({ enctype: 'multipart/form-data', responseType: 'json' });

      body.images.forEach((image, index) => {
        formData.append(`image-${index}`, image);
      });

      return this.http.put(this.url + '/' + endpoint, formData, { headers });
    }
    
    if (!reqOpts) {
      reqOpts = { responseType: 'text' };
    }
    return this.http.put(this.url + '/' + endpoint, body, reqOpts);
  }

  /**
   * PATCH verb action
   */
  patch(endpoint: string, body: any, reqOpts?: any) {
    return this.http.patch(this.url + '/' + endpoint, body, reqOpts);
  }

  /**
   * DELETE verb action
   */
  delete(endpoint: string, reqOpts?: any) {
    return this.http.delete(this.url + '/' + endpoint, reqOpts);
  }

  /**
   * Upload action
   */
  upload(endpoint: string, image: File) {
    const formData = new FormData();
    formData.append('image', image);
    const headers = new HttpHeaders({ enctype: 'multipart/form-data' });
    return this.http.post(this.url + '/' + endpoint, formData, { headers });
  }
}
