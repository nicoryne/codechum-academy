/**
 * Waits for the document to be fully loaded and initializes functions
 * for responsiveness and Pokémon rendering.
 */
document.addEventListener("DOMContentLoaded", async (e) => {
  /* ==================
   Responsiveness Scripts
   ================== */

  /**
   * Toggles the visibility of the mobile navigation menu.
   */
  const toggleMobileMenu = () => {
    const headerNav = document.getElementById("header-nav");

    // Show or hide the navigation menu based on its current state
    if (headerNav.style.display === "none" || headerNav.style.display === "") {
      headerNav.style.display = "block";
    } else {
      headerNav.style.display = "none";
    }
  };

  /**
   * Sets up the hamburger button to control the mobile navigation menu.
   */
  const initHamburgerButton = () => {
    const hamburgerBtn = document.getElementById("btn-hamburger");

    // Attach click event listener to toggle the menu
    hamburgerBtn.addEventListener("click", toggleMobileMenu);
  };

  // Initialize the hamburger menu button
  initHamburgerButton();

  /* ==================
   Pokemon Scripts
   ================== */

  /**
   * Preloads all existing Pokémon data (1,025 as of 11/24/2024).
   */
  let allPokemon = await fetchPokemonDataList(1, 1025);

  /**
   * Renders a subset of Pokémon into the container.
   * @param {Array} pokemonSubset - The Pokémon to render.
   */
  const renderPokemonSubset = (pokemonSubset) => {
    const container = document.getElementById("pkmn-container");

    // Clear existing Pokémon cards in the container
    container.innerHTML = "";

    // Create and append a card for each Pokémon
    pokemonSubset.forEach((pokemon) => {
      const card = document.createElement("pokemon-card");
      card.setAttribute("pokemon", JSON.stringify(pokemon));
      container.appendChild(card);
    });
  };

  /**
   * Populates the type filter dropdown with available Pokémon types.
   */
  const initFilterType = async () => {
    const types = await fetchPokemonTypes();
    const selectFilter = document.getElementById("filter-type");

    // Add an option for each Pokémon type, skipping uncommon ones
    types.forEach((type) => {
      const name = type.name;

      // Skip placeholder or rare types
      if (name === "stellar" || name === "unknown") {
        return;
      }

      // Create an option element for the type
      const typeOption = document.createElement("option");
      typeOption.setAttribute("value", name);
      typeOption.textContent = name.charAt(0).toUpperCase() + name.slice(1); // capitalizes names since they return as lowercase
      selectFilter.append(typeOption);
    });
  };

  /**
   * Applies filters based on search input and selected type.
   */
  const applyFilters = () => {
    const searchInput = document.getElementById("search-pokemon").value.toLowerCase();
    const selectedType = document.getElementById("filter-type").value;

    let filteredPokemon = allPokemon;

    // Filter Pokémon by name if search input is provided
    if (searchInput) {
      filteredPokemon = filteredPokemon.filter((pokemon) => pokemon.name.toLowerCase().includes(searchInput));
    }

    // Further filter Pokémon by selected type if applicable
    if (selectedType && selectedType !== "all") {
      filteredPokemon = filteredPokemon.filter((pokemon) =>
        pokemon.types.some((type) => type.toLowerCase() === selectedType)
      );
    }

    // Render the filtered Pokémon
    renderPokemonSubset(filteredPokemon);
  };

  /**
   * Sets up event listeners for search input and type filter dropdown.
   */
  const initFilters = () => {
    const searchField = document.getElementById("search-pokemon");
    const typeDropdown = document.getElementById("filter-type");

    // Trigger filtering when search input changes
    searchField.addEventListener("input", applyFilters);

    // Trigger filtering when type selection changes
    typeDropdown.addEventListener("change", applyFilters);
  };

  // Initialize type filter and event listeners, then render all Pokémon
  await initFilterType();
  initFilters();
  renderPokemonSubset(allPokemon);
});
