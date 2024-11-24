import { fetchPokemonDataList, fetchPokemonTypes } from "./services/pokemon.js";
import { initHamburgerButton } from "./mobile.js";
import { initFilterType, initFilters } from "./pokemonUi.js";

/* ==========================================================================
   Script Module
   ========================================================================== */

/* ==================
   Initialization
   ================== */

/**
 * Waits for the document to be fully loaded and initializes functions
 * for responsiveness and Pokémon rendering.
 */
document.addEventListener("DOMContentLoaded", async () => {
  try {
    /**
     * Preload all existing Pokémon from the PokeAPI
     *
     * Hardcoded value because there are only 1025 official Pokemon as of 11/24/2024
     * but PokeAPI has a higher count but will retrieve an error if we were to fetch from
     * a Pokemon ID higher than 1025
     */
    const totalPokemonCount = 1025;

    // Fetch Pokémon data and types
    const allPokemon = await fetchPokemonDataList(1, totalPokemonCount);
    const allTypes = await fetchPokemonTypes();

    // Initialize the hamburger menu button
    initHamburgerButton();

    // Set up filters and Pokémon rendering
    initFilterType(allTypes);
    initFilters(allPokemon);
  } catch (error) {
    console.error("Error initializing the Pokémon app:", error);
  }
});
