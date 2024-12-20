import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetFarmersSowingComponent } from './get-farmers-sowing.component';

describe('GetFarmersSowingComponent', () => {
  let component: GetFarmersSowingComponent;
  let fixture: ComponentFixture<GetFarmersSowingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetFarmersSowingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetFarmersSowingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
