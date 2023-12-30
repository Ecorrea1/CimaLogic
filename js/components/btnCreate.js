class BtnIngreso extends HTMLElement {
    constructor() {
      super();
      this.attributesComponents = [
        this.name = 'Nuevo Registro', //Aqui puedes darle Definiciones por defecto
        this.classname = 'btn btn-primary'
      ];
    }
    
    static get observedAttributes(){ return ['name', 'classname']; }
    attributeChangedCallback(attribute, _, newAttr){
      this.attributesComponents = [...this.attributesComponents, attribute]
      this[attribute] = newAttr;
    }
    connectedCallback() {
      this.innerHTML = `
      <div class="btn-ingreso container">
        <button id="btn_create_register" type="button" class="${this.classname}" data-bs-toggle="modal" data-bs-target="#myModal">${this.name}</button>
      </div>  
      `;
    }
  }
  
  customElements.define('btn-ingreso', BtnIngreso);