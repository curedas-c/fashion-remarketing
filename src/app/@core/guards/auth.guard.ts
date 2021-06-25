import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CookiesService } from '../services/cookies.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private cookie: CookiesService,
    private router: Router
  ) {}

  canActivate(): Observable<boolean> | boolean {
    return this.cookie.getCookie('credentials').pipe(
      map(res => {
        if (!res) {
          this.router.navigate(['/auth']);
        }
        return true;
      })
    );
  }
}
