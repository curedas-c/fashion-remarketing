import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { ApiService } from '@core/services/api.service';
import { ArticleService } from '../shared/article.service';

import { tableColumn } from '@shared/models/table/tableColumn.model';
import { Article } from '@shared/models/article/article.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UpdateArticleComponent } from '../update-article/update-article.component';

@Component({
  selector: 'app-list-article',
  templateUrl: './list-article.component.html',
  styleUrls: ['./list-article.component.scss'],
})
export class ListArticleComponent implements OnInit, OnDestroy {
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
    public dialog: MatDialog,
    private apiService: ApiService,
    private articleService: ArticleService
  ) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editItem(ev: Article) {
    const dialogRef = this.dialog.open(UpdateArticleComponent, {
      width: '800px',
      data: {currentArticle: ev}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // TODO: refresh table if data has been modified
      }
    });
    
  }

  removeItems(ids: string[]) {
    this.articleService
      .deleteItem(ids)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        console.log(res);
      });
  }
}
