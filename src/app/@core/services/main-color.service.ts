import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import FastAverageColor from 'fast-average-color';

@Injectable({
  providedIn: 'root',
})
export class MainColorService {
  fc: any;
  constructor() {
    this.fc = new FastAverageColor();
  }

  getDominateColor(image: any) : Observable<any> {
    return from(this.fc.getColorAsync(image));
  }
}
