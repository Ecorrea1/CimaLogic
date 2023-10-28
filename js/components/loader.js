class Loader extends HTMLElement {
    constructor() {
      super();
      this.attributesComponents = [
       //Aqui puedes darle Definiciones por defecto
        this.classname = 'fader',
        this.message = 'Cargando...'
      ];
    }

    static get observedAttributes(){ return ['classname', 'message']; }

    attributeChangedCallback(attribute, _, newAttr){
      this.attributesComponents = [...this.attributesComponents, attribute]
      this[attribute] = newAttr;
    }

    connectedCallback() {
        this.innerHTML = `
        <div id="fader" class="${this.classname}">
          <div class="loading"></div>
          <p class="message">${this.message}</p>
        </div>`;
    }
}

customElements.define('loader-component', Loader);