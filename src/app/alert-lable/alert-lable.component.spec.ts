import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertLableComponent } from './alert-lable.component';

describe('AlertLableComponent', () => {
  let component: AlertLableComponent;
  let fixture: ComponentFixture<AlertLableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertLableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertLableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
