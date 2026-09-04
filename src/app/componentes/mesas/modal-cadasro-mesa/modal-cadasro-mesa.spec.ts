import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCadasroMesa } from './modal-cadasro-mesa';

describe('ModalCadasroMesa', () => {
  let component: ModalCadasroMesa;
  let fixture: ComponentFixture<ModalCadasroMesa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalCadasroMesa],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalCadasroMesa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
