import { Component, computed, inject, signal } from '@angular/core';
import { PokemonService } from '../../pokemon.service';
import { Pokemon } from '../../pokemon.model';
import { DatePipe } from '@angular/common';
import { PokemonBorderDirective } from '../../pokemon-border.directive';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [PokemonBorderDirective, DatePipe, RouterLink],
  templateUrl: './pokemon-list.component.html',
  styles: ``
})
export class PokemonListComponent {
    readonly #pokemonService = inject(PokemonService);

  readonly pokemonList = signal(this.#pokemonService.getPokemonList());

  // constructor(private readonly pokemonService: PokemonService) {} // VINTAGE

readonly searchTerm = signal('')

  readonly pokemonListFiltered = computed(() => {
const searchTerm = this.searchTerm()
const pokemonList = this.pokemonList();

return pokemonList.filter(pokemon =>
  pokemon.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
);
  }
);

  size (pokemon: Pokemon) {
    if(pokemon.life <= 15){
      return 'Petit';
    }
    if(pokemon.life >= 25){
      return 'Grand';
    }

    return 'Moyen'
  };


  incrementLife(pokemon: Pokemon) {
pokemon.life = pokemon.life + 1;
}

    decrementLife(pokemon: Pokemon) {
pokemon.life = pokemon.life - 1;
  }
}

