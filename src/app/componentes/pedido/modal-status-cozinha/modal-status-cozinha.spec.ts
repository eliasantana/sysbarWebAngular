import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalStatusCozinha } from './modal-status-cozinha';

describe('ModalStatusCozinha', () => {
  let component: ModalStatusCozinha;
  let fixture: ComponentFixture<ModalStatusCozinha>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalStatusCozinha],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalStatusCozinha);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
