import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { PokemonDetail } from 'src/app/models/pokemonDetail.model';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-pokemon-detail',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss',]
})
export class PokemonDetailComponent implements OnInit,OnChanges {
   pokemon?: PokemonDetail;
  @Input() pokemonId?:number;
  constructor(private route: ActivatedRoute,private pokemonService : ServiceService,private location: Location) { }

  ngOnInit(): void {
    this.getPokemon();
  }
  ngOnChanges():void{
    this.getPokemon();
  }
  goBack(): void {
    this.location.back();
  }
  getPokemon(): void {
    this.pokemonService.getPokemon(this.pokemonId !== undefined ? this.pokemonId:1)
      .subscribe(pok => this.pokemon = pok);
  }
  lancerAudio() : void{
    const pokId = this.pokemonId !== undefined ? this.pokemonId:1
    var audio = new Audio("../../../assets/audio/"+pokId+".mp3");
    audio.play();
  }

}
