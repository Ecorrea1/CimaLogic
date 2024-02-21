class CkeckboxComponent extends HTMLElement {
    constructor() {
      super();
      this.attributesComponents = [
        this.name = 'Ingresa tu titulo',
        this.classname = 'form-check form-check-inline form-check-reverse',
        this.result = ''
      ];
    }
  
    static get observedAttributes(){ return ['name', 'classname', 'result']; }
  
    attributeChangedCallback(attribute, _, newAttr){
      this.attributesComponents = [...this.attributesComponents, attribute]
      this[attribute] = newAttr;
    }
  
      connectedCallback() {
        this.innerHTML = `
        <div class="${this.className}">
          <input class="form-check-input" type="checkbox" value="${this.result}" id="flexCheckDefault">
          <label class="form-check-label" for="flexCheckDefault">${this.name}</label>
        </div>`;
      }
  }
  
  customElements.define('checkbox-component', CkeckboxComponent);