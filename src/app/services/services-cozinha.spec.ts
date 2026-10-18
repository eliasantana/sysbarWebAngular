import { TestBed } from '@angular/core/testing';

import { ServicesCozinha } from './services-cozinha';

describe('ServicesCozinha', () => {
  let service: ServicesCozinha;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesCozinha);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
