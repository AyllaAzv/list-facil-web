import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddCategoriaComponent } from './dialog-add-categoria.component';

describe('DialogAddCategoriaComponent', () => {
  let component: DialogAddCategoriaComponent;
  let fixture: ComponentFixture<DialogAddCategoriaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddCategoriaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddCategoriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
