import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlistUpdateComponent } from './productlist-update.component';

describe('ProductlistUpdateComponent', () => {
  let component: ProductlistUpdateComponent;
  let fixture: ComponentFixture<ProductlistUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductlistUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductlistUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
