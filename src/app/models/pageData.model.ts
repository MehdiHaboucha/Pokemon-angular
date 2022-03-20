import { Pokemon } from './pokemon.model';

export interface PageData {
  data: Pokemon[];
  limit: number;
  offset: number;
}
