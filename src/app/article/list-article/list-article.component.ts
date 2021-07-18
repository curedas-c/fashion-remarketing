import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ApiService } from '@core/services/api.service';
import { CurrentDataStateService } from '@core/services/current-data-state.service';
import { ArticleService } from '../shared/article.service';

import { tableColumn } from '@shared/models/table/tableColumn.model';
import { Article } from '@shared/models/article/article.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss'],
})
export class ListArticleComponent implements OnInit {
  dataService = new ArticleService(this.apiService);
  displayedColumns: tableColumn[] = [
    {
      name: 'label',
      label: 'Nom',
    },
    {
      name: 'price',
      label: "Prix",
    },
    {
      name: 'description',
      label: 'Description',
    }
  ];
  columns = ['select_action', 'edit_action', 'label', 'price', 'description'];
  private unsubscribe$ = new Subject();
  
  constructor(
    private apiService: ApiService,
    private router: Router,
    private currentData: CurrentDataStateService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editItem(ev: Article) {
    this.currentData.setCurrentArticle(ev);
    this.router.navigateByUrl(`/dashboard/article/update/${ev._id}`, {
      state: { ignoreLoadingBar: true },
    });
    /* const url = this.router.serializeUrl(
      this.router.createUrlTree([`/dashboard/school-year/update/${ev.id}`])
    );
  
    // opens in a new window
    window.open(`/#/${url}`, '_blank'); */
  }

  removeItems(ids: string[] | number[]) {
    this.articleService
      .deleteItem(ids)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        console.log(res);
      });
  }
}
