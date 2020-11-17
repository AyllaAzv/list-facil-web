import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateFotoComponent } from './dialog-update-foto.component';

describe('DialogUpdateFotoComponent', () => {
  let component: DialogUpdateFotoComponent;
  let fixture: ComponentFixture<DialogUpdateFotoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUpdateFotoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
