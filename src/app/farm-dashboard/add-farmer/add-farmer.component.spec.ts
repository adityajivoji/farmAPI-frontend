import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFarmerComponent } from './add-farmer.component';

describe('AddFarmerComponent', () => {
  let component: AddFarmerComponent;
  let fixture: ComponentFixture<AddFarmerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddFarmerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFarmerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
