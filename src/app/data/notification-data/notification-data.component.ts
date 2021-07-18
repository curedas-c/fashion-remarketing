import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AppDataService } from '../shared/app-data.service';

@Component({
  selector: 'app-notification-data',
  templateUrl: './notification-data.component.html',
  styleUrls: ['./notification-data.component.scss']
})
export class NotificationDataComponent implements OnInit, OnDestroy {

  @Input() data: any = {};
  mailForm: FormGroup;
  isButtonDisabled = false;

  private unsubscribe$ = new Subject();
  constructor(private fb: FormBuilder, private appDataService: AppDataService) { }

  ngOnInit(): void {
    this.initForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initForm() {
    this.mailForm = this.fb.group({
      notification_mail: [this.data?.notification_mail || '', [Validators.required, Validators.email]]
    });
  }

  updateMail() {
    this.switchButtonState();
    this.appDataService
      .setItem(this.mailForm)
      .pipe(takeUntil(this.unsubscribe$), finalize(() => { this.switchButtonState() }))
      .subscribe(
        res => {
          this.mailForm.controls.notification_mail.patchValue(res.notification_mail);
        }
      );
  }

  switchButtonState() {
    this.isButtonDisabled = !this.isButtonDisabled;
  }

}
