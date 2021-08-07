import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from '@core/services/api.service';
import { tableColumn } from '@shared/models/table/tableColumn.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService } from '../shared/notification.service';
import { UpdateNotificationComponent } from '../update-notification/update-notification.component';

@Component({
  selector: 'app-list-notification',
  templateUrl: './list-notification.component.html',
  styleUrls: ['./list-notification.component.scss']
})
export class ListNotificationComponent implements OnInit, OnDestroy {
  dataService = new NotificationService(this.apiService);
  params = {};
  displayedColumns: tableColumn[] = [
    {
      name: 'message_title',
      label: 'Titre',
    },
    {
      name: 'message_text',
      label: 'Texte',
    },
    {
      name: 'schedule_date',
      label: 'Date d\'envoi',
    },
    {
      name: 'schedule_startDate',
      label: 'Date de début d\émission',
    },
    {
      name: 'schedule_endDate',
      label: 'Date de fin d\émission',
    }
  ];
  columns = [
    'select_action',
    'edit_action',
    'message_title',
    'message_text',
    'schedule_startDate',
    'schedule_endDate'
  ];
  private unsubscribe$ = new Subject();
  constructor(public dialog: MatDialog, private apiService: ApiService, private notificationService: NotificationService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }


  editItem(ev: Notification) {
    const dialogRef = this.dialog.open(UpdateNotificationComponent, {
      width: '800px',
      maxHeight: '90vh',
      data: {currentNotification: ev}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.params = {...this.params};
      }
    });
  }

  removeItems(ids: string[] | number[]) {
    this.notificationService
      .deleteItem(ids)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((res) => {
        this.params = {...this.params};
      });
  }

}
