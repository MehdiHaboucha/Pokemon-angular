import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonDetail } from 'src/app/models/pokemonDetail.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.html',
  styleUrls: ['./pokedex.scss',]
})
export class PokedexComponent implements OnInit {
  showFiller = false;
   pokemon?: PokemonDetail;
  @Input() pokemonId?:number;
  constructor(private route: ActivatedRoute,private pokemonService : ServiceService,private location: Location) { }

  ngOnInit(): void {
    
  }

  onPokemonSelected(id : number){
    
    this.pokemonId = id;
    console.log(this.pokemonId);
  }
}
