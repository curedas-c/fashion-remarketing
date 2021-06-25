import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationDataComponent } from './notification-data.component';

describe('NotificationDataComponent', () => {
  let component: NotificationDataComponent;
  let fixture: ComponentFixture<NotificationDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotificationDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
