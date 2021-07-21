import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { Promotion } from '@shared/models/promo/promo.model';
import { tableColumn } from '@shared/models/table/tableColumn.model';

import { PromotionService } from '../shared/services/promotion.service';
import { ApiService } from '@core/services/api.service';

import { UpdatePromotionComponent } from '../update-promotion/update-promotion.component';

@Component({
  selector: 'app-list-promotion',
  templateUrl: './list-promotion.component.html',
  styleUrls: ['./list-promotion.component.scss']
})
export class ListPromotionComponent implements OnInit {

  dataService = new PromotionService(this.apiService);
  params = {};
  displayedColumns: tableColumn[] = [
    {
      name: 'label',
      label: 'Description',
    },
    {
      name: 'endDate',
      label: 'Date de fin',
    },
    {
      name: 'percentage',
      label: 'Pourcentage de remise',
    },
    {
      name: 'fixedPrice',
      label: 'Prix promotionnel (produit)',
    },
  ];
  columns = [
    'select_action',
    'edit_action',
    'label',
    'endDate',
    'percentage',
    'fixedPrice',
  ];
  private unsubscribe$ = new Subject();
  constructor(public dialog: MatDialog, private apiService: ApiService, private promoService: PromotionService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  editItem(ev: Promotion) {
    const dialogRef = this.dialog.open(UpdatePromotionComponent, {
      width: '800px',
      data: {currentPromotion: ev}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.params = {...this.params};
      }
    });
  }

  removeItems(ids: string[] | number[]) {
    this.promoService
      .deleteItem(ids)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.params = {...this.params};
      });
  }

}
