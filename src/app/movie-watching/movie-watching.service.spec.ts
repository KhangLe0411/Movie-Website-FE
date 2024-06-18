import { TestBed } from '@angular/core/testing';

import { MovieWatchingService } from './movie-watching.service';

describe('MovieWatchingService', () => {
  let service: MovieWatchingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovieWatchingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
