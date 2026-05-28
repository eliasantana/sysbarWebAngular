import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaCargos } from './tabela-cargos';

describe('TabelaCargos', () => {
  let component: TabelaCargos;
  let fixture: ComponentFixture<TabelaCargos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TabelaCargos],
    }).compileComponents();

    fixture = TestBed.createComponent(TabelaCargos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
