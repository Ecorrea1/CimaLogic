class Footer extends HTMLElement {
  constructor() {
    super();
    this.attributesComponents = [
      this.copyright = '© Derechos Reservados',
      this.year = `${ new Date().getFullYear() }`,
      this.company = 'MOVIDA',
      this.classnamemessage = 'copyright'
    ];
  }

  static get observedAttributes(){ return ['copyright', 'year', 'company', 'classname','classnamemessage']; }

  attributeChangedCallback(attribute, _, newAttr){
    this.attributesComponents = [...this.attributesComponents, attribute]
    this[attribute] = newAttr;
  }

  connectedCallback() {
      this.innerHTML = `
      <footer class="${ this.classnama }">
        <p class="${ this.classnamemessage }">${this.copyright} ${this.year} | ${this.company}</p>
      </footer>
    `;
  }
}

customElements.define('footer-component', Footer);