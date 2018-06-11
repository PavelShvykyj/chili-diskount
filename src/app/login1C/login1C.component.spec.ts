import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Login1CComponent } from './login1C.component';

describe('Login1CComponent', () => {
  let component: Login1CComponent;
  let fixture: ComponentFixture<Login1CComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Login1CComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Login1CComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
