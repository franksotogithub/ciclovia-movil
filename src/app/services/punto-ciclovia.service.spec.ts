import { TestBed } from '@angular/core/testing';

import { PuntoCicloviaService } from './punto-ciclovia.service';

describe('PuntoCicloviaService', () => {
  let service: PuntoCicloviaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PuntoCicloviaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
