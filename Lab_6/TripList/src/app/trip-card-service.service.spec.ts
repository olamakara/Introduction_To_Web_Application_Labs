import { TestBed } from '@angular/core/testing';

import { TripCardServiceService } from './trip-card-service.service';

describe('TripCardServiceService', () => {
  let service: TripCardServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TripCardServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
