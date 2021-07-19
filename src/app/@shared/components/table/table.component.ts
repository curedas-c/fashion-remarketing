import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Output, EventEmitter } from '@angular/core';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

import { tableColumn } from '../../models/table/tableColumn.model';
import { SelectionModel } from '@angular/cdk/collections';
import { MatTableDataSource } from '@angular/material/table';

import { fromEvent, merge, of as observableOf, Subject } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  startWith,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { inOutAnimation } from '@shared/animations/inOutAnimation';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  animations: [inOutAnimation],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent implements OnInit, AfterViewInit {
  @Input() title: string;
  @Input() displayedColumns: tableColumn[] = [];
  @Input() columns: string[] = [];
  @Input() dataService: any;

  @Input() selectable = false;
  @Input() editable = false;
  requestParams: any = {};
  dataSource: MatTableDataSource<any> = new MatTableDataSource([]);
  selection = new SelectionModel<any>(true, []);

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @Output() edit = new EventEmitter<any>();
  @Output() remove = new EventEmitter<any>();
  private unsubscribe$ = new Subject();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('searchInput') input: ElementRef;

  constructor(private cdRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getServerData();
}

  ngAfterViewInit() {
    // server-side search
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        takeUntil(this.unsubscribe$),
        debounceTime(1000),
        distinctUntilChanged(),
        tap(() => {
          const value = this.input.nativeElement.value;
          if (value.length > 0 && value.length < 3) {
            return;
          } else {
            this.paginator._changePageSize(0);
          }
        })
      )
      .subscribe();
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        takeUntil(this.unsubscribe$),
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          this.requestParams = {
            ...this.requestParams,
            filter: this.input.nativeElement.value,
            sortBy: this.sort.active,
            order: this.sort.direction,
            page: this.paginator.pageIndex,
          };
          return this.dataService!.getTableData(this.requestParams);
        }),
        map((data: any) => {
          // Flip flag to show that loading has finished.
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data: any[]) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.cdRef.detectChanges();
      });
  }

  getServerData() {
    this.isLoadingResults = true;
    this.dataService!.getTableData()
      .pipe(
        takeUntil(this.unsubscribe$),
        map((data: any) => {
          this.isLoadingResults = false;
          this.isRateLimitReached = false;
          this.resultsLength = data.total_count;

          return data.items;
        }),
        catchError(() => {
          this.isLoadingResults = false;
          // Catch if the GitHub API has reached its rate limit. Return empty data.
          this.isRateLimitReached = true;
          return observableOf([]);
        })
      )
      .subscribe((data) => {
        this.dataSource = new MatTableDataSource<any>(data);
        this.cdRef.detectChanges();
      });
  }

  // Search
  search(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }

    this.selection.select(...this.dataSource.data);
  }

  /*
   * Events
   */

  onEdit(item: any) {
    this.edit.emit(item);
  }

  onRemove() {
    const selectedIDs = this.selection.selected.map(selection => selection._id);
    this.remove.emit(selectedIDs);
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
