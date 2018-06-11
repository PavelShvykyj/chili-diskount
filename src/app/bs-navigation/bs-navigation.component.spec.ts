import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BsNavigationComponent } from './bs-navigation.component';

describe('BsNavigationComponent', () => {
  let component: BsNavigationComponent;
  let fixture: ComponentFixture<BsNavigationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BsNavigationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BsNavigationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
