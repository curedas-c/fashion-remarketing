import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StateService } from './state.service';

interface AppState {
  currentClient: any;
}

const initialState: AppState = {
  currentClient: null
};

@Injectable({
  providedIn: 'root'
})
export class AppStateService extends StateService<AppState> {
  currentClient$: Observable<any> = this.select((state) => state.currentClient);
  
  constructor() {
    super(initialState);
  }
}
