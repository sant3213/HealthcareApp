import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterPublicationComponent } from './register-publication.component';
import { ReactiveFormsModule } from '@angular/forms';

describe('RegisterPublicationComponent', () => {
  let component: RegisterPublicationComponent;
  let fixture: ComponentFixture<RegisterPublicationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      declarations: [ RegisterPublicationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterPublicationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
