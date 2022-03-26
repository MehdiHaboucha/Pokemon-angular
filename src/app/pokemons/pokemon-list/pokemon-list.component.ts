import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
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

  param: string = '';
  limit: number = 20;
  offset = 0;
  offsetSerach = -20;
  oldValue: string = '';
  scrolled: boolean = false;
  constructor(private pokemonService: ServiceService) {}

  ngOnInit(): void {
    this.getPokemons();
  }

  getPokemons(): void {
    this.pokemonService.getPokemons(this.limit, 0).subscribe((pok) => {
      this.pokemons = pok.data;
    });
  }
  onScroll(event: any) {
    this.scrolled = true;
    if (this.param === '') {
      this.offsetSerach = 0;
      this.offset = this.offset + this.limit;
      this.pokemonService.getPokemons(this.limit, this.offset).subscribe((mespokemon) => {
        this.pokemons = this.pokemons?.concat(mespokemon.data);
      });
    } else {
      this.oldValue = this.param;
      this.offset += this.limit;
      this.pokemonService.getPokemonSearch(this.param, this.limit, this.offset).subscribe((pok) => {
        this.pokemons = this.pokemons?.concat(pok.data);
      });
      //  this.searchPokemon();
    }
  }

  searchPokemon() {
    console.log('old :' + this.oldValue);
    console.log('new :' + this.param);
    this.offset = 0;

    this.param
      ? this.pokemonService.getPokemonSearch(this.param, this.limit, 0).subscribe((pok) => {
          this.pokemons = pok.data;
        })
      : this.getPokemons();
    this.offsetSerach = this.offsetSerach + this.limit;
  }
  onPokemonSelected(id: number) {
    this.pokemonSelected.emit(id);
  }
}
