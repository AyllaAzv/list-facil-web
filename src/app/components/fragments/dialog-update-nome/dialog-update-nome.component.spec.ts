import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateNomeComponent } from './dialog-update-nome.component';

describe('DialogUpdateNomeComponent', () => {
  let component: DialogUpdateNomeComponent;
  let fixture: ComponentFixture<DialogUpdateNomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogUpdateNomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogUpdateNomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
