export default class PokemonCard extends HTMLElement {
  constructor() {
    super();
    this.pokemonData = null; // Store the Pokémon data
  }

  static get observedAttributes() {
    return ["pokemon"]; // Attribute to observe (pokemon)
  }

  // Callback function when an observed attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    // Check if the 'pokemon' attribute has changed
    if (name === "pokemon" && oldValue != newValue) {
      this.pokemonData = JSON.parse(newValue); // Parse the new JSON data
      this.render(); // Re-render the card with updated data
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.pokemonData) {
      this.innerHTML = `
          <article class="pokemon-card" key=${this.pokemonData.id}>
            <div class="card-header">
              <h3 class="pokemon-name">${this.pokemonData.name.toUpperCase()}</h2>
              <h4 class="pokemon-id">#${this.pokemonData.id}</h3>
            </div>
            <img class="pokemon-image" src="${this.pokemonData.image}" alt="${this.pokemonData.name}">
            <div class="card-details">
              <p class="pokemon-type">
                ${this.pokemonData.types
                  .map(
                    (type) =>
                      `<img class="type-icon" src="/public/images/pokemon-types/${type.toLowerCase()}.png" alt="${type} Icon" width="64px" height="auto">`
                  )
                  .join("")}
              </p>
              <p class="pokemon-weight">Weight: ${this.pokemonData.weight} kg</p>
              <p class="pokemon-height">Height: ${this.pokemonData.height} m</p>
            </div>
          </article>
        `;
    }
  }
}

customElements.define("pokemon-card", PokemonCard);
