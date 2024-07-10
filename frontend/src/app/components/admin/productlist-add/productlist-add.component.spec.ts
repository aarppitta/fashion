import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductlistAddComponent } from './productlist-add.component';

describe('ProductlistAddComponent', () => {
  let component: ProductlistAddComponent;
  let fixture: ComponentFixture<ProductlistAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductlistAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductlistAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
