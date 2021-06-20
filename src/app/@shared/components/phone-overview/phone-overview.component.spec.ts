import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PhoneOverviewComponent } from './phone-overview.component';

describe('PhoneOverviewComponent', () => {
  let component: PhoneOverviewComponent;
  let fixture: ComponentFixture<PhoneOverviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PhoneOverviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PhoneOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
