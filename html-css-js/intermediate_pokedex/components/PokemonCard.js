export default class PokemonCard extends HTMLElement {
  constructor() {
    super();
    this.pokemonData = null;
  }

  static get observedAttributes() {
    return ["pokemon"];
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === "pokemon") {
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
          <article>
            <h2>${this.pokemonData.name}</h2>
            <img src="${this.pokemonData.sprites.front_default}" alt="${this.pokemonData.name}">
            <p>Type: ${this.pokemonData.types.map((t) => t.type.name).join(", ")}</p>
          </article>
        `;
    } else {
      this.innerHTML = `
          <article>
            <p>Loading...</p>
          </article>
        `;
    }
  }
}

customElements.define("pokemon-card", PokemonCard);
