import { Component, OnInit, OnDestroy } from '@angular/core';
import { inOutAnimation } from '@shared/animations/inOutAnimation';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ArticleService } from '../shared/article.service';
import { ArticleCategoryService } from 'src/app/article-category/shared/services/article-category.service';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
  animations: [inOutAnimation],
})
export class CreateArticleComponent implements OnInit, OnDestroy {
  creationForm: FormGroup;
  previewVisible = false;
  isButtonDisabled = false;
  categoryList$ = this.categoryService.getAllItems();
  private unsubscribe$ = new Subject();
  constructor(
    private fb: FormBuilder,
    private articleService: ArticleService,
    private categoryService: ArticleCategoryService
  ) {}

  ngOnInit(): void {
    this.initCreationForm();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  initCreationForm() {
    this.creationForm = this.fb.group({
      label: ['', [Validators.required]],
      images: ['', [Validators.required]],
      categories: ['', [Validators.required]],
      price: ['', [Validators.required]],
      description: ['', [Validators.required]]
    });
  }

  createEvent() {
    this.switchButtonState();
    this.articleService
      .setItem(this.creationForm)
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

  switchPreviewVisibility() {
    this.previewVisible = !this.previewVisible;
  }

  switchButtonState() {
    this.isButtonDisabled = !this.isButtonDisabled;
  }
}
