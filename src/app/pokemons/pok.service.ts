import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { PageData } from '../models/pageData.model';
import { PokemonDetail } from '../models/pokemonDetail.model';
import { LoginData } from '../models/loginData.model';
@Injectable({
  providedIn: 'root',
})
export class ServiceService {
  constructor(private http: HttpClient) {}
  getPokemons(limit: number, offset: number): Observable<PageData> {
    return this.http.get<PageData>(
      'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons?limit=' + limit + '&offset=' + offset
    );
  }
  getPokemon(id: number): Observable<PokemonDetail> {
    return this.http.get<PokemonDetail>('http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons/' + id);
  }
  getPokemonSearch(param: String, limit: number, offset: number): Observable<PageData> {
    const params = new HttpParams().set('offset', offset).set('limit', limit);
    return this.http.get<PageData>(
      'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/pokemons?search=' + param,
      { params: params }
    );
  }

  postLogin(login: Object): Observable<LoginData> {
    return this.http.post<LoginData>('http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/auth/login', login);
  }
  postInscription(login: Object):Observable<Object>{
    console.log(login)
    return this.http.post<Object>('http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/trainers', login);
  }
  getMyPokemon(token: string): Observable<number[]> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.get<number[]>('http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/trainers/me/team', {
      headers,
    });
  }

  updateMyPokemons(pokemons: number[], token: string): Observable<number> {
    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);
    return this.http.put<number>(
      'http://app-ec21e68e-3e55-42d7-b1ae-3eef7507a353.cleverapps.io/trainers/me/team',
      pokemons,
      { headers }
    );
  }
}
