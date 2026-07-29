import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutoEstoque } from './produto-estoque';

describe('ProdutoEstoque', () => {
  let component: ProdutoEstoque;
  let fixture: ComponentFixture<ProdutoEstoque>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProdutoEstoque],
    }).compileComponents();

    fixture = TestBed.createComponent(ProdutoEstoque);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
