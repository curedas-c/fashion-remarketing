import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { inOutAnimation } from '../../animations/inOutAnimation';

@Component({
  selector: 'app-chip-selector',
  templateUrl: './chip-selector.component.html',
  styleUrls: ['./chip-selector.component.scss'],
  animations: [inOutAnimation]
})
export class ChipSelectorComponent implements OnInit {

  @Input() itemList: any[];
  @Input() observableList: Observable<any[]>;
  @Input() multiSelect: boolean = false;
  @Output() onSelect = new EventEmitter<any>();

  selectedItem: any;
  selectedList: any[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  setSelectedItem(item: any) {
    this.selectedItem = item;
    this.onSelect.emit(this.selectedItem);
  }

  setItem(item: any) {
    if (this.selectedList.includes(item)) {
      this.selectedList = this.selectedList.filter((el) => el !== item);
    } else {
      this.selectedList = [...this.selectedList, item];
    }
    this.onSelect.emit(this.selectedList);
  }

  isSelectedItem(item: any): boolean {
    return this.selectedItem === item;
  }

  isInList(item: any): boolean {
    return this.selectedList.includes(item);
  }

  get listIsEmpty() {
    return this.itemList.length === 0;
  }

}
