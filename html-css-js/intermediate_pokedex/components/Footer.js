export default class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <footer id="site-footer">
            <div class="wrapper">
              <div class="social-links" aria-labelleby="social-links">
                <ul>
                  <li>
                    <a
                      class="social-link"
                      href="https://www.facebook.com/Pokemon/"
                      aria-label="Visit us on Facebook"
                    >
                      <img src="/public/icons/icon_fb.svg" alt="Facebook Icon" class="social-icon" />
                    </a>
                  </li>
                  <li>
                    <a
                      class="social-link"
                      href="https://www.youtube.com/channel/UCFctpiB_Hnlk3ejWfHqSm6Q"
                      aria-label="Visit us on Youtube"
                    >
                      <img src="/public/icons/icon_yt.svg" alt="Youtube Icon" class="social-icon" />
                    </a>
                  </li>
                  <li>
                    <a
                      class="social-link"
                      href="https://www.instagram.com/pokemon/"
                      aria-label="Visit us on Instagram"
                    >
                      <img src="/public/icons/icon_ig.svg" alt="Instagram Icon" class="social-icon" />
                    </a>
                  </li>
                </ul>
              </div>
                <nav class="footer-nav">
                 <ul>
                  <li><a href="#hero">Home</a></li>
                  <li><a href="#about">About</a></li>
                  <li><a href="#search-pokemon">Search Pokemon</a></li>
                 </ul>
                </nav>
                <small>&copy; 2024 Pokédex. All Rights Reserved.</small>
            </div>
        </footer>
    `;
  }
}

customElements.define("site-footer", Footer);
