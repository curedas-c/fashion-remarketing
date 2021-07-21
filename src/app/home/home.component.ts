import { Component, OnInit, OnDestroy } from '@angular/core';
import { combineLatest, forkJoin, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArticleCategoryService } from '../article-category/shared/services/article-category.service';
import { ArticleService } from '../article/shared/article.service';
import { MainColorService } from '../@core/services/main-color.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  articleCount: number;
  orderCount: number;
  // orderStats$ = this.orderService.getStats();
  articleStats$: Observable<any> = this.articleService.getStats();
  private unsubscribe$ = new Subject();
  constructor(private articleService: ArticleService, private color: MainColorService) {}

  ngOnInit(): void {
    this.getStats();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  private getStats(): void {
    forkJoin([this.articleStats$])
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(([articleStat]) => {
        this.articleCount = articleStat.count;
      });
  }

  async getColor(el: any) {
    //return await this.color.getDominateColor(el);
    return await 'rgb(255, 255, 225)';
  }
}
