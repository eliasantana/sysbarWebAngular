import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalPromover } from './modal-promover';

describe('ModalPromover', () => {
  let component: ModalPromover;
  let fixture: ComponentFixture<ModalPromover>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalPromover],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalPromover);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
