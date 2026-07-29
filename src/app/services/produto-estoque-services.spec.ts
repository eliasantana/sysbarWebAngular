import { TestBed } from '@angular/core/testing';

import { ProdutoEstoqueServices } from './produto-estoque-services';

describe('ProdutoEstoqueServices', () => {
  let service: ProdutoEstoqueServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoEstoqueServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
