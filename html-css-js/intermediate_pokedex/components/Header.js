export default class Header extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
            <header id="site-header">
              <div class="wrapper">
                <a href="#hero" aria-label="Home">
                 <img src="public/images/pokeball-icon.webp" 
                  alt="Pokedex Logo"
                  width="64"
                  height="64" />
                  <h1>Pokédex</h1>
                </a>
                <nav id="header-nav">
                <ul>
                  <li><a href="#hero">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#search-pokemon">Search Pokemon</a></li>
                  <li><a href="#contact">Contact</a></li>
                </ul>
               </nav>

               <button id="btn-hamburger" class="resp resp-phone" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                </svg>
               </button>
              </div>
            </header>
        `;
  }
}

customElements.define("site-header", Header);
