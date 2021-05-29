import { Injectable } from '@angular/core';
import { ArticleCategory } from '@shared/models/articleCategory.model';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

interface CurrentDataState {
  articleCategory: ArticleCategory;
}

const initialState: CurrentDataState = {
  articleCategory: null
};

@Injectable({
  providedIn: 'root'
})
export class CurrentDataStateService extends StateService<CurrentDataState> {
  articleCategory$: Observable<ArticleCategory> = this.select((state) => state.articleCategory);

  constructor() {
    super(initialState);
  }

  setCurrentCategory(item: ArticleCategory) {
    this.setState({
      articleCategory: item
    });
  }
}
