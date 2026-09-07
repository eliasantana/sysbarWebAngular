import { TestBed } from '@angular/core/testing';

import { MemesasServices } from './memesas-services';

describe('MemesasServices', () => {
  let service: MemesasServices;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MemesasServices);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
