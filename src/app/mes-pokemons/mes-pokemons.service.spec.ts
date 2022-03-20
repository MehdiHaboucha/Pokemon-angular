import { TestBed } from '@angular/core/testing';

import { MesPokemonsService } from './mes-pokemons.service';

describe('MesPokemonsService', () => {
  let service: MesPokemonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MesPokemonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
