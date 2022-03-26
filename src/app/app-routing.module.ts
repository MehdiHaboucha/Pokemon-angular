import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './pokemons/pokemon-detail/pokemon-detail.component';
import { PokedexComponent } from './pokemons/pokedex/pokedex.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
import { MesPokemonsComponent } from './mes-pokemons/mes-pokemons.component';
import { InscriptionComponent } from './inscription/inscription.component';
const routes: Routes = [
  { path: '', redirectTo: '/team', pathMatch: 'full' },
  // { path: 'pokemons', component: PokemonListComponent },
  { path: 'pokemon/:id', pathMatch: 'full', component: PokemonDetailComponent },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'team', component: FormulaireComponent },
  { path: 'mesPokemons', component: MesPokemonsComponent },
  { path: 'inscription', component: InscriptionComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
