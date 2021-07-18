import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { finalize, takeUntil } from 'rxjs/operators';
import { AppDataService } from '../shared/app-data.service';

@Component({
  selector: 'app-contact-data',
  templateUrl: './contact-data.component.html',
  styleUrls: ['./contact-data.component.scss']
})
export class ContactDataComponent implements OnInit, OnDestroy {

  @Input() data: any = {};
  mailForm: FormGroup;
  contactForm: FormGroup;
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
      mail: [this.data?.mail || '', [Validators.required, Validators.email]]
    });

    this.contactForm = this.fb.group({
      contact_first: [this.data?.contact_first || '', [Validators.required, Validators.pattern('[0-9]{10}')]]
    });
  }

  updateMail() {
    this.switchButtonState();
    this.appDataService
      .setItem(this.mailForm)
      .pipe(takeUntil(this.unsubscribe$), finalize(() => { this.switchButtonState() }))
      .subscribe(
        (res) => {
          this.mailForm.controls.mail.reset(res.mail);
        }
      );
  }

  updateContact() {
    this.switchButtonState();
    this.appDataService
      .setItem(this.contactForm)
      .pipe(takeUntil(this.unsubscribe$), finalize(() => { this.switchButtonState() }))
      .subscribe(
        (res) => {
          this.contactForm.controls.contact_first.reset(res.contact_first);
        }
      );
  }

  switchButtonState() {
    this.isButtonDisabled = !this.isButtonDisabled;
  }
}
