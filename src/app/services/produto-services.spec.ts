import { TestBed } from '@angular/core/testing';

import { ProdutoServices } from './produto-services';

describe('ProdutoServices', () => {
  let service: ProdutoServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProdutoServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
