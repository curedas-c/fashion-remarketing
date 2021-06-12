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
  displayedColumns: tableColumn[] = [
    {
      name: 'label',
      label: 'Description',
    },
    {
      name: 'discountEndDate',
      label: 'Date de fin',
    },
    {
      name: 'discountPercentage',
      label: 'Pourcentage de remise',
    },
    {
      name: 'discountPrice',
      label: 'Prix promotionnel (produit)',
    },
  ];
  columns = [
    'select_action',
    'edit_action',
    'label',
    'discountEndDate',
    'discountPercentage',
    'discountPrice',
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
        // refresh table if data has been modified
      }
    });
  }

  removeItems(ids: string[] | number[]) {
    this.promoService
      .deleteItem(ids)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        console.log(res);
      });
  }

}
