import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PopupTypeComponent } from './popup-type.component';

describe('PopupTypeComponent', () => {
  let component: PopupTypeComponent;
  let fixture: ComponentFixture<PopupTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopupTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PopupTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
