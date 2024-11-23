export default class PokemonCard extends HTMLElement {
  constructor() {
    super();
    this.pokemonData = null;
  }

  static get observedAttributes() {
    return ["pokemon"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "pokemon" && oldValue != newValue) {
      this.pokemonData = JSON.parse(newValue);
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  render() {
    if (this.pokemonData) {
      this.innerHTML = `
          <article key=${this.pokemonData.id}>
            <h2>${this.pokemonData.name}</h2>
            <img src="${this.pokemonData.image}" alt="${this.pokemonData.name}">
            <p class="pkmn-type">Type: ${this.pokemonData.types}</p>
            <p class="pkmn-weight">Weight: ${this.pokemonData.weight} kg</p>
            <p class="pkmn-height">Height: ${this.pokemonData.height} m</p>
          </article>
        `;
    }
  }
}

customElements.define("pokemon-card", PokemonCard);
