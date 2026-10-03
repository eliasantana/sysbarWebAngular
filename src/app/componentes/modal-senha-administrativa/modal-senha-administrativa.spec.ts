import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalSenhaAdministrativa } from './modal-senha-administrativa';

describe('ModalSenhaAdministrativa', () => {
  let component: ModalSenhaAdministrativa;
  let fixture: ComponentFixture<ModalSenhaAdministrativa>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalSenhaAdministrativa],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalSenhaAdministrativa);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
