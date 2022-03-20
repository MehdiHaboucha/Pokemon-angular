import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonDetail } from '../models/pokemonDetail.model';
import { ServiceService } from '../pokemons/pok.service';

@Component({
  selector: 'app-mes-pokemons',
  templateUrl: './mes-pokemons.component.html',
  styleUrls: ['./mes-pokemons.component.scss'],
})
export class MesPokemonsComponent implements OnInit {
  pokemonsIds: number[] = [];
  pokemons: PokemonDetail[] = [];
  token: string = '';
  success:string='';
  error:string='';
  @Input() pokemonId?: number;
  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') + '';
    if (localStorage.getItem('user') === null) {
      this.router.navigate(['/team']);
    }
    this.getMyPokemons();
  }

  getMyPokemonDetail(id: number) {
    return this.service.getPokemon(id);
  }

  getMyPokemons(): void {
    this.service.getMyPokemon(this.token).subscribe((res) => {
      this.pokemonsIds = res;
      res.forEach((pokId) => {
        this.getMyPokemonDetail(pokId).subscribe((pok) => {
          this.pokemons?.push(pok);
        });
      });
    });
  }

  onPokemonSelected(id: number) {
    this.pokemonId = id;
    const message = this.ajoutPokemon(this.pokemonId);
    this.error=message.error;
    this.success=message.msg;
    setTimeout(() => {
            this.error="";
            this.success="";
       }, 2000)

  }

  ajoutPokemon(id: number) {
    // on peut pas ajouter plus de 6 pokémons
    if (this.pokemonsIds.length >= 6) {
      console.log('Full');
      return { error: "Il n' y a plus de place dans votre Deck.Limite 6",msg:'' };
    }
    if (this.pokemonsIds.includes(id)) {
      console.log('Doublon');
      return { error: 'Le Pokemon existe déja dans votre deck',msg:'' };
    }
    this.ajouterPokemonApi(id);
    this.service.updateMyPokemons(this.pokemonsIds, this.token).subscribe((nb) => console.log(nb));
    return { msg: 'pokemon ajouté avec succès',error:'' };
  }
  ajouterPokemonApi(id: number) {
    this.pokemonsIds.push(id);
    this.getMyPokemonDetail(id).subscribe((pok) => {
      this.pokemons?.push(pok);
    });
  }
  supprimerPokemon(id: number) {
    const index = this.pokemonsIds.indexOf(id);
    const indexPoke = this.pokemons.findIndex((e) => e.id === id);
    this.pokemons.splice(
      this.pokemons.findIndex((e) => e.id === id),
      1
    );
    this.pokemonsIds.splice(index, 1);
    console.log(this.pokemons);
    console.log(this.pokemonsIds);
    this.service.updateMyPokemons(this.pokemonsIds, this.token).subscribe((nb) => console.log(nb));
  }

  lancerAudio(id: number): void {
    var audio = new Audio('../../assets/audio/' + id + '.mp3');
    audio.play();
  }
}
