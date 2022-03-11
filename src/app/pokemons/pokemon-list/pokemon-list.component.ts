import { Component,EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Pokemon } from 'src/app/models/pokemon.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent implements OnInit {
  @Input() pokemons?: Pokemon[];
  @Output() pokemonSelected = new EventEmitter<number>();
  param :String = '';
  limit:number=20;
  offset:number=0;
  constructor(private pokemonService : ServiceService) { }

  ngOnInit(): void {
    this.getPokemons();
  }

  
  getPokemons(): void {
    this.pokemonService.getPokemons(this.limit,this.offset)
      .subscribe(pok => this.pokemons = pok.data);
      console.log(this.pokemons)
  }
  onScroll(){
    console.log("scroll");
    
    this.offset = this.offset+this.limit;
    this.pokemonService.getPokemons(this.limit,this.offset)
      .subscribe(pok => this.pokemons?.concat(pok.data));
      console.log(this.offset)
  }

  onclickPokedex(id : number){

  }
  searchPokemon(){
    console.log(this.param);
    this.param?this.pokemonService.getPokemonSearch(this.param)
      .subscribe(pok => this.pokemons = pok.data):this.getPokemons();
  }
  onPokemonSelected(id:number){
    this.pokemonSelected.emit(id);
  }

}
