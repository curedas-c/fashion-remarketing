import { Component, OnInit, OnDestroy } from '@angular/core';

import { ArticleCategoryService } from '../shared/services/article-category.service';
import { ApiService } from '@core/services/api.service';

import { tableColumn } from '@shared/models/table/tableColumn.model';
import { ArticleCategory } from '@shared/models/article-category/articleCategory.model';
import { UpdateCategoryComponent } from '../update-category/update-category.component';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
})
export class ListCategoryComponent implements OnInit, OnDestroy {
  dataService = new ArticleCategoryService(this.apiService);
  params = {};
  displayedColumns: tableColumn[] = [
    {
      name: 'label',
      label: 'Categorie',
    },
    {
      name: 'description',
      label: 'Description',
    },
  ];
  columns = ['select_action', 'edit_action', 'label', 'description'];
  private unsubscribe$ = new Subject();

  constructor(public dialog: MatDialog, private apiService: ApiService,  private categoryService: ArticleCategoryService) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  editItem(ev: ArticleCategory) {
    const dialogRef = this.dialog.open(UpdateCategoryComponent, {
      width: '800px',
      data: {currentCategory: ev}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.params = {...this.params};
      }
    });;
  }

  removeItems(ids: string[]) {
    this.categoryService
      .deleteItem(ids)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.params = {...this.params};
      });
  }
}
