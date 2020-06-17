import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyPublicationComponentComponent } from './my-publication-component.component';

describe('MyPublicationComponentComponent', () => {
  let component: MyPublicationComponentComponent;
  let fixture: ComponentFixture<MyPublicationComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyPublicationComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyPublicationComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
