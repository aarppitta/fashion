import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcategoryUpdateComponent } from './productcategory-update.component';

describe('ProductcategoryUpdateComponent', () => {
  let component: ProductcategoryUpdateComponent;
  let fixture: ComponentFixture<ProductcategoryUpdateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductcategoryUpdateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductcategoryUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
