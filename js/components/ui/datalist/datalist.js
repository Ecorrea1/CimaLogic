class DataListComponent extends HTMLElement {
    constructor() {
      super();
      this.attributesComponents = [
        this.title = 'Title',  // default attribute value
        this.name = 'Ingresa tu titulo',
        this.classname = 'form-check form-check-inline form-check-reverse',
        this.result = ''
      ];
    }
  
    static get observedAttributes(){ return ['title','name', 'classname', 'result']; }
  
    attributeChangedCallback(attribute, _, newAttr){
      this.attributesComponents = [...this.attributesComponents, attribute]
      this[attribute] = newAttr;
    }
  
      connectedCallback() {
        this.innerHTML = `
        <label for="exampleDataList" class="form-label">Datalist example</label>
        <input class="form-control" list="datalistOptions" id="exampleDataList" placeholder="${this.name}">
        <datalist id="datalistOptions"></datalist>`;
      }
  }
  
  customElements.define('datalist-component', DataListComponent);