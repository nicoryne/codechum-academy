export default class Footer extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.innerHTML = `
        <footer id="site-footer">
            <div class="wrapper">
            </div>
        </footer>
    `;
  }
}

customElements.define("site-footer", Footer);
