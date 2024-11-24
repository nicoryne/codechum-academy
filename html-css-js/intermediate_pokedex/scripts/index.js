import { fetchPokemonDataList, fetchPokemonTypes } from "./services/pokemon.js";
import { initHamburgerButton } from "./mobile.js";
import { initFilterType, initFilters, renderPokemonSubset } from "./pokemonUi.js";

/* ==================
   DOM Loaded Scripts
   ================== */

/**
 * Waits for the document to be fully loaded and initializes functions
 * for responsiveness and Pokémon rendering
 */
document.addEventListener("DOMContentLoaded", async (e) => {
  // Preloads all existing Pokemon from the PokeAPI (1,025 Pokemons available as of 11/24/2024)
  let allPokemon = await fetchPokemonDataList(1, 1025);

  // Preloads all Pokemon types from the PokeAPI
  let allTypes = await fetchPokemonTypes();

  // Initialize the hamburger menu button
  initHamburgerButton();

  // Initialize type filter and event listeners, then render all Pokémon
  initFilterType(allTypes);
  initFilters(allPokemon);
  renderPokemonSubset(allPokemon);
});
