import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistroComponent } from './registro.component';

import { HttpClientTestingModule } from '@angular/common/http/testing'
import { ReactiveFormsModule } from '@angular/forms';


describe('RegistroComponent', () => {
  let component: RegistroComponent;
  let fixture: ComponentFixture<RegistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistroComponent ],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
