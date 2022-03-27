import { Component, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable, switchMap } from 'rxjs';
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
  success: string = '';
  error: string = '';
  @Input() pokemonId?: number;
  constructor(private service: ServiceService, private router: Router) {}

  ngOnInit(): void {
    this.token = localStorage.getItem('token') + '';
    if (localStorage.getItem('isLoggedIn') === null) {
      this.router.navigate(['/']);
    }
    this.getMyPokemons();
  }

  getMyPokemonDetail(id: number) {
    return this.service.getPokemon(id);
  }

  getMyPokemons(): void {
    this.service
      .getMyPokemon(this.token)
      .pipe(
        switchMap((pokemonIds) => {
          const pokemonObservables: Observable<PokemonDetail>[] = pokemonIds.map((id) => this.getMyPokemonDetail(id));
          return forkJoin(pokemonObservables);
        })
      )
      .subscribe({
        next: (pokemons) => (this.pokemons = pokemons),
        error: (error) => {
          if (error.status === 401 || error.status === 403) {
            this.seDeconnecter();
          }
        },
      });

    // this.service.getMyPokemon(this.token).subscribe({
    //   next: (res) => {
    //     this.pokemonsIds = res;
    //     res.forEach((pokId) => {
    //       this.getMyPokemonDetail(pokId).subscribe({
    //         next: (pok) => {
    //           this.pokemons?.push(pok);
    //         },
    //         error: (error) => {
    //           if (error.status === 401 || error.status === 403) {
    //             this.seDeconnecter();
    //           }
    //         },
    //       });
    //     });
    //   },
    //   error: (error) => {
    //     error;
    //   },
    // });
  }

  seDeconnecter() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/team']);
  }
  onPokemonSelected(id: number) {
    this.pokemonId = id;
    const message = this.ajoutPokemon(this.pokemonId);
    this.error = message.error;
    this.success = message.msg;
    setTimeout(() => {
      this.error = '';
      this.success = '';
    }, 2000);
  }

  ajoutPokemon(id: number) {
    // on peut pas ajouter plus de 6 pokémons
    if (this.pokemons.length >= 6) {
      return { error: "Il n' y a plus de place dans votre Deck.Limite 6", msg: '' };
    }
    const doublon = this.pokemons.find((e) => e.id === id);
    console.log(doublon);
    if (doublon !== undefined) {
      return { error: 'Le Pokemon existe déja dans votre deck', msg: '' };
    }
    this.ajouterPokemonApi(id);
    this.lancerAudio(id);

    return { msg: 'pokemon ajouté avec succès', error: '' };
  }
  ajouterPokemonApi(id: number) {
    //gestion affichage
    this.getMyPokemonDetail(id).subscribe({
      next: (pok) => {
        this.pokemons?.push(pok);
        this.service
          .updateMyPokemons(
            this.pokemons.map((pok) => {
              return pok.id;
            }),
            this.token
          )
          .subscribe({
            next: (res) => {
              this.pokemons;
            },
            error: (error) => {
              if (error.status === 401 || error.status === 403) {
                this.seDeconnecter();
              }
            },
          });
      },
      error: (error) => {
        if (error.status === 401 || error.status === 403) {
          this.seDeconnecter();
        }
      },
    });
    //gestion Api
    // this.pokemonsIds = this.pokemons.map(pok=>{return pok.id});
    //   this.pokemonsIds.push(id);
  }
  supprimerPokemon(id: number) {
    this.pokemons = this.pokemons.filter((pok) => pok.id !== id);
    this.lancerAudio(id);
    this.service
      .updateMyPokemons(
        this.pokemons.map((pok) => {
          return pok.id;
        }),
        this.token
      )
      .subscribe({
        next: (res) => {},
        error: (error) => {
          if (error.status === 401 || error.status === 403) {
            this.seDeconnecter();
          }
        },
      });
  }

  lancerAudio(id: number): void {
    var audio = new Audio('../../assets/audio/' + id + '.mp3');
    audio.play();
  }
}
