import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient} from '@angular/common/http';
import { PageData } from '../models/pageData.model';
import { PokemonDetail } from '../models/pokemonDetail.model';
import { Pokemon } from '../models/pokemon.model';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  constructor(private http : HttpClient) { }
  getPokemons(limit :Number ,offset :Number): Observable<PageData> {
    return this.http.get<PageData>('http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons?limit='+limit+'&offset='+offset);
  }
  getPokemon(id:number): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>('http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons/'+id);
  }
  getPokemonSearch(param:String): Observable<PageData> {
    return this.http.get<PageData>('http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons?search='+param);
  }
}
