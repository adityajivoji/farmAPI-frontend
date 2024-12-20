import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FarmDashboardComponent } from './farm-dashboard.component';

describe('FarmDashboardComponent', () => {
  let component: FarmDashboardComponent;
  let fixture: ComponentFixture<FarmDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FarmDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FarmDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
