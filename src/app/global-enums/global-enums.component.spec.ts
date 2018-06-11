import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalEnumsComponent } from './global-enums.component';

describe('GlobalEnumsComponent', () => {
  let component: GlobalEnumsComponent;
  let fixture: ComponentFixture<GlobalEnumsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GlobalEnumsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalEnumsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
