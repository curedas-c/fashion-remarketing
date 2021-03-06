import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { Observable, of } from 'rxjs';
import { environment } from '@environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CookiesService {
  constructor(private cookie: CookieService) {}

  public setCookie(key: any, content?: any): Observable<any> {
    let date = new Date();
    date.setHours(date.getHours() + 2);

    return of(
      this.cookie.put(key, JSON.stringify(content), {
        expires: date,
        secure: environment.production ? true : false,
        httpOnly: false,
        storeUnencoded: true,
      })
    );
  }

  public getCookie(key: any): Observable<any> {
    const cookie = this.cookie.get(key);
    return of(cookie ? JSON.parse(cookie) : null);
  }

  public clearCookie(key: any): Observable<boolean> {
    this.cookie.remove(key);

    return of(true);
  }

  public clearAllCookies(): Observable<boolean> {
    this.cookie.removeAll();

    return of(true);
  }
}
