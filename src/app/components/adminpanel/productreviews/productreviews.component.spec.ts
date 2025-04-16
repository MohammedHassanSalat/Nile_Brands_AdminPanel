import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductreviewsComponent } from './productreviews.component';

describe('ProductreviewsComponent', () => {
  let component: ProductreviewsComponent;
  let fixture: ComponentFixture<ProductreviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductreviewsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductreviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
