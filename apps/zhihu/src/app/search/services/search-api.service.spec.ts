import { TestBed } from '@angular/core/testing';
import { SearchApiService } from './search-api.service';

describe('SearchApiService', () => {

  let service: SearchApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

});
