/* ==========================================================================
   Pokemon UI-related Scripts
   ========================================================================== */

/* ==================
   Constant Variables
   ================== */

// Number of Pokémon shown per page
const MAX_POKEMON_PER_PAGE = 8;

// Types that are in the API but aren't in the game
const UNUSED_TYPES = ["stellar", "unknown"];

/* ==================
   Rendering Functions
   ================== */

/**
 * Filters Pokémon by name and type
 * @param {Array} allPokemon - Complete Pokémon list
 * @param {string} searchInput - Search query from the user
 * @param {string} selectedType - Selected Pokémon type
 * @returns {Array} - Filtered Pokémon list
 */
const filterPokemon = (allPokemon, searchInput, selectedType) => {
  let filtered = allPokemon;

  // Filter by name
  if (searchInput) {
    filtered = filtered.filter((pokemon) => pokemon.name.toLowerCase().includes(searchInput.toLowerCase()));
  }

  // Filter by type
  if (selectedType && selectedType !== "all") {
    filtered = filtered.filter((pokemon) => pokemon.types.some((type) => type.toLowerCase() === selectedType));
  }

  return filtered;
};

/**
 * Renders a subset of Pokémon into the container
 * @param {Array} pokemonSubset - The Pokémon to render
 */
const renderPokemonSubset = (pokemonSubset) => {
  const container = document.getElementById("pkmn-container");

  // Validate container existence
  if (!container) {
    console.error("Pokemon container not found.");
    return;
  }

  container.innerHTML = "";

  // Display a message if no Pokémon match the filters
  if (pokemonSubset.length === 0) {
    container.textContent = "No Pokémon found!";
    return;
  }

  // Limit the Pokémon shown per page
  pokemonSubset.slice(0, MAX_POKEMON_PER_PAGE).forEach((pokemon) => {
    const card = document.createElement("pokemon-card");
    card.setAttribute("pokemon", JSON.stringify(pokemon));
    container.appendChild(card);
  });
};

/**
 * Populates the type filter dropdown with available Pokémon types
 * @param {Array} allTypes - Complete Pokémon type list
 */
export const initFilterType = (allTypes) => {
  const selectFilter = document.getElementById("filter-type");

  if (!selectFilter) {
    console.error("Filter type dropdown not found.");
    return;
  }

  allTypes.forEach((type) => {
    const name = type.name;

    // Skip unused or invalid types
    if (UNUSED_TYPES.includes(name)) return;

    const typeOption = document.createElement("option");
    typeOption.value = name;
    typeOption.textContent = name.charAt(0).toUpperCase() + name.slice(1);
    selectFilter.append(typeOption);
  });
};

/**
 * Applies filters and updates the rendered Pokémon
 * @param {Array} allPokemon - Complete Pokémon list
 * @param {int} pageNumber - Page number for pagination
 */
const applyFilters = (allPokemon, pageNumber) => {
  const searchInput = document.getElementById("search-pokemon")?.value || "";
  const selectedType = document.getElementById("filter-type")?.value || "all";

  // Apply filters
  const filteredPokemon = filterPokemon(allPokemon, searchInput, selectedType);

  // Calculate total pages and current subset
  const totalPokemonCount = filteredPokemon.length;
  const startIndex = (pageNumber - 1) * MAX_POKEMON_PER_PAGE;
  const endIndex = startIndex + MAX_POKEMON_PER_PAGE;

  // Render Pokémon
  renderPokemonSubset(filteredPokemon.slice(startIndex, endIndex));

  return totalPokemonCount;
};

/**
 * Sets up event listeners for search input, type filter, and pagination buttons
 * @param {Array} allPokemon - Complete Pokémon list
 */
export const initFilters = (allPokemon) => {
  const searchField = document.getElementById("search-pokemon");
  const typeDropdown = document.getElementById("filter-type");
  const firstPageBtn = document.getElementById("btn-first");
  const prevPageBtn = document.getElementById("btn-prev");
  const nextPageBtn = document.getElementById("btn-next");
  const lastPageBtn = document.getElementById("btn-last");

  if (!searchField || !typeDropdown || !firstPageBtn || !prevPageBtn || !nextPageBtn || !lastPageBtn) {
    console.error("One or more filter elements are missing.");
    return;
  }

  let pageNumber = 1;
  let totalPages = 1;

  // Debounce helper for input events to prevent excessive filtering
  // calls as the user types
  const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => fn(...args), delay);
    };
  };

  const updateFilters = debounce(() => {
    pageNumber = 1;
    const totalPokemonCount = applyFilters(allPokemon, pageNumber);

    // Using Math.ceil here to ensure we are not skipping the last page
    // if the total count is not a multiple of the maximum Pokemon per page
    totalPages = Math.ceil(totalPokemonCount / MAX_POKEMON_PER_PAGE);
  }, 300);

  // Attach event listeners
  searchField.addEventListener("input", updateFilters);
  typeDropdown.addEventListener("change", updateFilters);

  firstPageBtn.addEventListener("click", () => {
    pageNumber = 1;
    applyFilters(allPokemon, pageNumber);
  });

  prevPageBtn.addEventListener("click", () => {
    if (pageNumber > 1) {
      pageNumber--;
      applyFilters(allPokemon, pageNumber);
    }
  });

  nextPageBtn.addEventListener("click", () => {
    if (pageNumber < totalPages) {
      pageNumber++;
      applyFilters(allPokemon, pageNumber);
    }
  });

  lastPageBtn.addEventListener("click", () => {
    // Sets page number to the last available page
    pageNumber = totalPages;
    applyFilters(allPokemon, pageNumber);
  });

  // Initial render
  const initialPokemonCount = applyFilters(allPokemon, pageNumber);
  totalPages = Math.ceil(initialPokemonCount / MAX_POKEMON_PER_PAGE);
};
