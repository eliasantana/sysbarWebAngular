import { TestBed } from '@angular/core/testing';

import { EstoqueServices } from './estoque-services';

describe('EstoqueServices', () => {
  let service: EstoqueServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstoqueServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
