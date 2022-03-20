import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { ServiceService } from '../pok.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  @Input() pokemons?: Pokemon[];
  @Output() pokemonSelected = new EventEmitter<number>();

  param: String = '';
  limit: number = 20;
  offset = 0;
  offsetSerach = 0;
  constructor(private pokemonService: ServiceService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons(this.limit, 0).subscribe((pok) => {
      this.pokemons = pok.data;
    });
  }
  onScroll() {
    if (this.param === '') {
      this.offset = this.offset + 20;
      this.pokemonService.getPokemons(this.limit, this.offset).subscribe((mespokemon) => {
        this.pokemons = this.pokemons?.concat(mespokemon.data);
      });
    }
  }

  searchPokemon() {
    this.offset = 0;
    this.param
      ? this.pokemonService.getPokemonSearch(this.param, 151, 0).subscribe((pok) => {
          this.pokemons = pok.data;
        })
      : this.getPokemons();
  }
  onPokemonSelected(id: number) {
    this.pokemonSelected.emit(id);
  }
}
