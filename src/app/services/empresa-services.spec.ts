import { TestBed } from '@angular/core/testing';

import { EmpresaServices } from './empresa-services';

describe('EmpresaServices', () => {
  let service: EmpresaServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmpresaServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
