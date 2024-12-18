import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetTodayTomorrowComponent } from './get-today-tomorrow.component';

describe('GetTodayTomorrowComponent', () => {
  let component: GetTodayTomorrowComponent;
  let fixture: ComponentFixture<GetTodayTomorrowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetTodayTomorrowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetTodayTomorrowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
