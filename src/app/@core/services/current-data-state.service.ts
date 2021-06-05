import { Injectable } from '@angular/core';
import { ArticleCategory } from '@shared/models/articleCategory.model';
import { Article } from '@shared/models/article.model';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

interface CurrentDataState {
  articleCategory: ArticleCategory;
  article: Article;
}

const initialState: CurrentDataState = {
  articleCategory: null,
  article: null
};

@Injectable({
  providedIn: 'root'
})
export class CurrentDataStateService extends StateService<CurrentDataState> {
  articleCategory$: Observable<ArticleCategory> = this.select((state) => state.articleCategory);
  article$: Observable<Article> = this.select((state) => state.article);

  constructor() {
    super(initialState);
  }

  setCurrentCategory(item: ArticleCategory) {
    this.setState({
      articleCategory: item
    });
  }

  setCurrentArticle(item: Article) {
    this.setState({
      article: item
    });
  }
}
