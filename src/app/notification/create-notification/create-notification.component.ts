import {
  Component,
  OnInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import {
  debounceTime,
  distinctUntilChanged,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { ArticleCategoryService } from 'src/app/article-category/shared/services/article-category.service';
import { ArticleService } from 'src/app/article/shared/article.service';
import { PromotionService } from 'src/app/promotion/shared/services/promotion.service';
import { ScheduleTypes } from '@shared/models/notification/scheduleType.model';
import {
  addControl,
  removeControls,
} from '@shared/utils/formGroupModifier';
import { NotificationService } from '../shared/notification.service';

@Component({
  selector: 'app-create-notification',
  templateUrl: './create-notification.component.html',
  styleUrls: ['./create-notification.component.scss'],
})
export class CreateNotificationComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('searchInput') input: ElementRef;
  messageForm: FormGroup;
  targetForm: FormGroup;
  scheduleForm: FormGroup;

  today: Date = new Date();
  scheduleType = ScheduleTypes;
  schedulePlaceholder: string = 'Envoyer aux utilisateurs';

  itemList: any[];
  message_link: string = '';
  imagePlaceholder: string = 'assets/images/image_placeholder.png';

  isButtonDisabled = false;
  private unsubscribe$ = new Subject();
  constructor(
    private fb: FormBuilder,
    private notificationService: NotificationService,
    private articleService: ArticleService,
    private categoryService: ArticleCategoryService,
    private promoService: PromotionService
  ) {}

  ngOnInit(): void {
    this.initMessageForm();
    this.initScheduleForm();
    this.initTargetForm();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  ngAfterViewInit(): void {
    this.listenToScheduleTypeChanges();
    this.listenToTargetChanges();
    this.listenToInputChanges();
  }

  initMessageForm() {
    this.messageForm = this.fb.group({
      message_title: [''],
      message_text: ['', [Validators.required]],
      message_image: [''],
      message_name: [''],
    });
  }

  initTargetForm() {
    this.targetForm = this.fb.group({
      target: ['', [Validators.required]],
      message_link: ['', [Validators.required]],
      target_id: ['']
    });
  }

  initScheduleForm() {
    this.scheduleForm = this.fb.group({
      schedule_type: ['', [Validators.required]],
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
      ['schedule_type'],
      true
    );
    this.scheduleForm = addControl(this.scheduleForm, 'schedule_date');
    this.scheduleForm = addControl(this.scheduleForm, 'schedule_time');
    this.scheduleForm.controls.schedule_date.patchValue(date);
    this.setScheduleType(ScheduleTypes.SCHEDULED);
  }

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
            this.scheduleForm = removeControls(
              this.scheduleForm,
              ['schedule_type'],
              true
            );
            this.scheduleForm = addControl(
              this.scheduleForm,
              'schedule_startDate'
            );
            this.scheduleForm = addControl(
              this.scheduleForm,
              'schedule_endDate'
            );
            break;

          default:
            break;
        }
      });
  }

  listenToTargetChanges() {
    this.targetForm.controls.target.valueChanges
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((target: string) => {
        this.itemList = undefined;
        if (['', 'none'].includes(target)) {
          this.targetForm = removeControls(this.targetForm, ['message_link']);
        } else {
          this.input.nativeElement.value = '';
          this.targetForm = addControl(this.targetForm, 'message_link');
          this.targetForm.controls.message_link.patchValue('');
        }
      });
  }

  listenToInputChanges() {
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
            this.searchElement(value);
          }
        })
      )
      .subscribe();
  }

  searchElement(value) {
    const params = {
      filter: value,
    };
    switch (this.targetForm.controls.target.value) {
      case 'article':
        this.message_link = '/route/to/article';
        this.articleService.getAllItems(params).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
          this.itemList = res;
        })
        break;

      case 'article-category':
        this.message_link = '/route/to/article-category';
        this.categoryService.getAllItems(params).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
          this.itemList = res;
        })
        break;

      case 'promotion':
        this.message_link = '/route/to/promotion';
        this.promoService.getAllItems(params).pipe(takeUntil(this.unsubscribe$)).subscribe(res => {
          this.itemList = res;
        })
        break;

      default:
        break;
    }
  }

  createNotification() {
    this.switchButtonState();
    const DATA = this.fb.group({
      ...this.scheduleForm.controls,
      ...this.messageForm.controls,
    });
    this.notificationService
      .setItem(DATA)
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe(
        (res) => {
          console.log(res);
        },
        (complete) => {
          this.switchButtonState();
        }
      );
  }

  switchButtonState() {
    this.isButtonDisabled = !this.isButtonDisabled;
  }

  setItem(item: any) {
    let link = `${this.message_link}/${item.id}`;
    this.targetForm.controls.target_id.patchValue(item.id);
    this.targetForm.controls.message_link.patchValue(link);
  }

  preview(event: any) {
    if (event.target.files) {}
  }

  get haveTarget() {
    return !['', 'none'].includes(this.targetForm.controls.target.value);
  }
}
