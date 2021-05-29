import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ArticleCategoryService } from '../shared/services/article-category.service';
import { CurrentDataStateService } from '@core/services/current-data-state.service';
import { ApiService } from '@core/services/api.service';

import { tableColumn } from '@shared/models/tableColumn.model';
import { ArticleCategory } from '@shared/models/articleCategory.model';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss'],
})
export class ListCategoryComponent implements OnInit {
  dataService = new ArticleCategoryService(this.apiService);
  displayedColumns: tableColumn[] = [
    {
      name: 'label',
      label: 'Categorie',
    },
    {
      name: 'main_image',
      label: 'Image',
    },
    {
      name: 'description',
      label: 'Description',
    },
  ];
  columns = ['select_action', 'edit_action', 'label', 'main_image', 'description']

  constructor(private apiService: ApiService, private router: Router, private currentData: CurrentDataStateService) {}

  ngOnInit(): void {}

  editItem(ev: ArticleCategory) {
    console.log(ev);
    this.currentData.setCurrentCategory(ev);
    this.router.navigateByUrl(`/dashboard/article-category/update/${ev.id}`);
  }

  removeItems(ev: any) {
    console.log(ev);
  }
}
