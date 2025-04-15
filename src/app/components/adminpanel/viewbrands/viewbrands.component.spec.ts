import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewbrandsComponent } from './viewbrands.component';

describe('ViewbrandsComponent', () => {
  let component: ViewbrandsComponent;
  let fixture: ComponentFixture<ViewbrandsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewbrandsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ViewbrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
