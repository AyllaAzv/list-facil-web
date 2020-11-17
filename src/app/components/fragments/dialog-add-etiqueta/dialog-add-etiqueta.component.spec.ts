import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddEtiquetaComponent } from './dialog-add-etiqueta.component';

describe('DialogAddEtiquetaComponent', () => {
  let component: DialogAddEtiquetaComponent;
  let fixture: ComponentFixture<DialogAddEtiquetaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogAddEtiquetaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogAddEtiquetaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
