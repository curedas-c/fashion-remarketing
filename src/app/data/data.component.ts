import { Component, OnInit, OnDestroy } from '@angular/core';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { AppDataService } from './shared/app-data.service';
import { AppSettings } from '../@shared/models/data/appSettings.model';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit, OnDestroy {

  appSettings: AppSettings;
  activeLink: string;
  isLoading = false;
  private unsubscribe$ = new Subject();
  constructor(private router: Router, private appDataService: AppDataService) {
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((event: NavigationEnd) => {
        this.activeLink = event.urlAfterRedirects;
      });
  }

  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  getData() {
    this.switchLoading();
    this.appDataService
      .getSettings()
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          this.appSettings = res;
        },
        (complete) => {
          this.switchLoading();
        }
      );
  }

  urlContains(url: string) {
    return this.activeLink.includes(url);
  }

  switchLoading() {
    this.isLoading = !this.isLoading;
  }

}
