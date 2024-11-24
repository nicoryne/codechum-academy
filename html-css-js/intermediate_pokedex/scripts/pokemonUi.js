/* ==================
   Pokemon UI Scripts
   ================== */

/**
 * Renders a subset of Pokémon into the container
 * @param {Array} pokemonSubset - The Pokémon to render
 */
export const renderPokemonSubset = (pokemonSubset) => {
  const container = document.getElementById("pkmn-container");

  // Clear existing Pokémon cards in the container
  container.innerHTML = "";

  // Checks if pokemonSubset is empty then sets appropriate
  // text for container HTML
  if (pokemonSubset.length === 0) {
    container.innerHTML = "No pokemon found!";
    return;
  }

  // Create and append a card for each Pokémon
  pokemonSubset.forEach((pokemon) => {
    const card = document.createElement("pokemon-card");
    card.setAttribute("pokemon", JSON.stringify(pokemon));
    container.appendChild(card);
  });
};

/**
 * Populates the type filter dropdown with available Pokémon types
 * @param {Array} allTypes - Complete Pokemon Type List
 */
export const initFilterType = (allTypes) => {
  const selectFilter = document.getElementById("filter-type");

  // Add an option for each Pokémon type, skipping unused ones
  allTypes.forEach((type) => {
    const name = type.name;

    // Skipping types that aren't really in the game
    // but are in the API
    if (name === "stellar" || name === "unknown") {
      return;
    }

    // Create an option element for the type
    const typeOption = document.createElement("option");
    typeOption.setAttribute("value", name);

    // Capitalizes names since they return as lowercase
    typeOption.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    selectFilter.append(typeOption);
  });
};

/**
 * Applies filters based on search input and selected type
 * @param {Array} allPokemon - Complete Pokemon list
 */
const applyFilters = (allPokemon) => {
  const searchInput = document.getElementById("search-pokemon").value.toLowerCase();
  const selectedType = document.getElementById("filter-type").value;

  let filteredPokemon = allPokemon;

  // Filter Pokémon by name if search input is provided
  if (searchInput) {
    // Make names lowercase again to match data in API
    filteredPokemon = filteredPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(searchInput));
  }

  // Further filter Pokémon by selected type if applicable
  if (selectedType && selectedType !== "all") {
    // Similar to names, make types lowercase again to match data in API
    filteredPokemon = filteredPokemon.filter((pokemon) =>
      pokemon.types.some((type) => type.toLowerCase() === selectedType)
    );
  }

  // Render the filtered Pokémon
  renderPokemonSubset(filteredPokemon);
};

/**
 * Sets up event listeners for search input and type filter dropdown
 * @param {Array} allPokemon - Complete Pokemon list
 */
export const initFilters = (allPokemon) => {
  const searchField = document.getElementById("search-pokemon");
  const typeDropdown = document.getElementById("filter-type");

  // Trigger filtering when search input changes
  searchField.addEventListener("input", applyFilters(allPokemon));

  // Trigger filtering when type selection changes
  typeDropdown.addEventListener("change", applyFilters(allPokemon));
};
