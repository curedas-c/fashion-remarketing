import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '@core/services/api.service';
import { Order } from '@shared/models/order/order.model';
import { tableColumn } from '@shared/models/table/tableColumn.model';
import { Subject } from 'rxjs';
import { DetailOrderComponent } from '../detail-order/detail-order.component';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.scss']
})
export class ListOrderComponent implements OnInit, OnDestroy {

  dataService = new OrderService(this.apiService);
  displayedColumns: tableColumn[] = [
    {
      name: 'createdAt',
      label: 'Date de création',
    },
    {
      name: 'clientName',
      label: 'Nom Client',
    },
    {
      name: 'total',
      label: 'Prix Total',
    },
    {
      name: 'paymentType',
      label: 'Type de paiement',
    }
  ];
  columns = [
    'edit_action',
    'createdAt',
    'clientName',
    'total',
    'paymentType'
  ];
  private unsubscribe$ = new Subject();
  constructor(public dialog: MatDialog, private apiService: ApiService, private orderService: OrderService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  editItem(ev: Order) {
    const dialogRef = this.dialog.open(DetailOrderComponent, {
      width: '800px',
      data: {currentOrder: ev}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // refresh table if data has been modified
      }
    });
  }
}
