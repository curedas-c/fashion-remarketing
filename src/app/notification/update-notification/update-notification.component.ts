import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  Inject,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { ScheduleTypes } from '@shared/models/notification/scheduleType.model';
import { addControl, removeControls } from '@shared/utils/formGroupModifier';
import { NotificationService } from '../shared/notification.service';
import { Notification } from '@shared/models/notification/notification.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-notification',
  templateUrl: './update-notification.component.html',
  styleUrls: ['./update-notification.component.scss'],
})
export class UpdateNotificationComponent
  implements OnInit, OnDestroy, AfterViewInit
{
  currentNotification: Notification;

  messageForm: FormGroup;
  scheduleForm: FormGroup;

  today: Date = new Date();
  scheduleType = ScheduleTypes;
  schedulePlaceholder: string = 'Envoyer aux utilisateurs';

  imagePlaceholder: string = 'assets/images/image_placeholder.png';

  isButtonDisabled = false;
  private unsubscribe$ = new Subject();
  constructor(
    public dialogRef: MatDialogRef<UpdateNotificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
    this.currentNotification = this.data.currentNotification;
  }

  ngOnInit(): void {
    this.initForms();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterViewInit(): void {
    this.listenToScheduleTypeChanges();
    setTimeout(() => {
      this.setScheduleType(
        this.currentNotification.schedule_type as ScheduleTypes
      );
      if (this.currentNotification.schedule_date) {
        this.setScheduleDate(this.currentNotification.schedule_date);
      }
    }, 500);
  }

  initForms() {
    console.log(this.currentNotification)
    this.messageForm = this.fb.group({
      message_title: [this.currentNotification.message_title || ''],
      message_text: [
        this.currentNotification.message_text || '',
        [Validators.required],
      ],
      message_image: [this.currentNotification.message_image || ''],
      message_name: [this.currentNotification.message_name || ''],
      isActive: [this.currentNotification.isActive || ''],
    });

    this.scheduleForm = this.fb.group({
      schedule_type: [
        this.currentNotification.schedule_type || '',
        [Validators.required],
      ],
      schedule_date: [
        this.currentNotification.schedule_date || '',
        [Validators.required],
      ],
      schedule_time: [
        this.currentNotification.schedule_time || '',
        [Validators.required],
      ],
      schedule_startDate: [
        new Date(this.currentNotification.schedule_startDate) || '',
        [Validators.required],
      ],
      schedule_endDate: [
        new Date(this.currentNotification.schedule_endDate) || '',
        [Validators.required],
      ],
    });
  }

  setScheduleType(type: ScheduleTypes) {
    switch (type) {
      case ScheduleTypes.NOW:
        this.schedulePlaceholder = 'Maintenant';
        break;

      case ScheduleTypes.SCHEDULED:
        const date = new Date(
          this.scheduleForm.controls.schedule_date.value
        ).toLocaleDateString(undefined, {
          weekday: 'short',
          day: '2-digit',
          month: '2-digit',
          year: '2-digit',
        });
        this.schedulePlaceholder = date;
        break;

      case ScheduleTypes.EVERYDAY:
        this.schedulePlaceholder = 'Tous les jours';
        break;

      default:
        break;
    }

    this.scheduleForm.controls.schedule_type.patchValue(type);
  }

  setScheduleDate(date: any) {
    this.scheduleForm = removeControls(
      this.scheduleForm,
      ['schedule_type', 'schedule_time'],
      true
    );
    this.scheduleForm = addControl(this.scheduleForm, 'schedule_date');
    this.scheduleForm.controls.schedule_date.patchValue(date);
    this.setScheduleType(ScheduleTypes.SCHEDULED);
  }

  // Events listener
  listenToScheduleTypeChanges() {
    this.scheduleForm.controls.schedule_type.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((type: string) => {
        switch (type) {
          case ScheduleTypes.NOW:
            this.scheduleForm = removeControls(
              this.scheduleForm,
              ['schedule_type'],
              true
            );
            break;

          case ScheduleTypes.EVERYDAY:
            this.scheduleForm = removeControls(this.scheduleForm, [
              'schedule_date',
            ]);
            this.scheduleForm = addControl(
              this.scheduleForm,
              'schedule_startDate',
              this.currentNotification.schedule_startDate
            );
            this.scheduleForm = addControl(
              this.scheduleForm,
              'schedule_endDate',
              this.currentNotification.schedule_endDate
            );
            this.scheduleForm = addControl(
              this.scheduleForm,
              'schedule_time',
              this.currentNotification.schedule_time
            );
            break;

          case ScheduleTypes.SCHEDULED:
            this.scheduleForm = removeControls(
              this.scheduleForm,
              ['schedule_type', 'schedule_time', 'schedule_date'],
              true
            );
            this.scheduleForm = addControl(
              this.scheduleForm,
              'schedule_date',
              this.currentNotification.schedule_date
            );
            this.scheduleForm = addControl(
              this.scheduleForm,
              'schedule_time',
              this.currentNotification.schedule_time
            );
            break;

          default:
            break;
        }
      });
  }

  updateMessage() {
    this.updateNotification(this.messageForm);
  }

  updateSchedule() {
    this.updateNotification(this.scheduleForm);
  }

  updateNotification(form: FormGroup) {
    this.switchButtonState();
    this.notificationService
      .setItem(form, this.currentNotification._id)
      .pipe(
        takeUntil(this.unsubscribe$),
        finalize(() => {
          this.switchButtonState();
        })
      )
      .subscribe((res) => {
        this.dialogRef.close(true);
      });
  }

  switchButtonState() {
    this.isButtonDisabled = !this.isButtonDisabled;
  }

  preview(event: any) {
    if (event.target.files) {
    }
  }

  setFiles(files: File[]) {
    this.messageForm.controls.message_image.patchValue(files[0] || null);
  }

  get isEveryday() {
    return (
      this.scheduleForm.controls.schedule_type.value === ScheduleTypes.EVERYDAY
    );
  }

  get defaultImage() {
    const image = this.messageForm.controls.message_image.value;
    return image ? [`http://localhost:3000/${image}`] : null;
  }
}
