import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListComponent } from './pokemon-list/pokemon-list.component';
import { PokemonDetailComponent } from './pokemon-detail/pokemon-detail.component';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {MatChipsModule} from '@angular/material/chips';
import {MatButtonModule} from '@angular/material/button';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import { PokedexComponent } from './pokedex/pokedex.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    PokemonListComponent,
    PokemonDetailComponent,
    PokedexComponent
  ],
  imports: [
    CommonModule,
    MatGridListModule,
    MatCardModule,
    MatListModule,
    MatChipsModule,
    InfiniteScrollModule,
    MatIconModule,
    RouterModule,
    MatSidenavModule,
    MatButtonModule,
    MatFormFieldModule ,
    MatInputModule,
    FormsModule
  ]
})
export class PokemonsModule { }
