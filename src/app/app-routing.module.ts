import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokemonDetailComponent } from './pokemons/pokemon-detail/pokemon-detail.component';
import { PokemonListComponent } from './pokemons/pokemon-list/pokemon-list.component';
import { PokedexComponent } from './pokemons/pokedex/pokedex.component';
import { FormulaireComponent } from './formulaire/formulaire.component';
const routes: Routes = [{ path: '', redirectTo: '/pokemons', pathMatch: 'full' },{ path: 'pokemons', component: PokemonListComponent },{ path:'pokemon/:id', pathMatch: 'full',component:PokemonDetailComponent },{ path: 'pokedex', component: PokedexComponent },{ path: 'team', component: FormulaireComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
