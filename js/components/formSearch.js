class FormSearch extends HTMLElement {
  constructor() {
    super();
    // this.attachShadow({ mode: "open" });
    this.attributesComponents = [ this.btnname = 'Buscar' ];
  }

  static get observedAttributes(){ return ['btnname']; }

  attributeChangedCallback(attribute, _, newAttr){
    this.attributesComponents = [...this.attributesComponents, attribute]
    this[attribute] = newAttr;
  }

  template() {
    return `
    <div class="container-search container">
      <form class="d-flex" role="search" id="form-search">
        <input class="form-control me-2" type="search" id="idSearch" placeholder="Ingresa ID" aria-label="Search">
        <input class="form-control me-2" type="search" id="nameSearch" placeholder="Ingresa Descripcion" aria-label="Search">
        <input class="form-control me-2" type="number" id="phoneSearch" placeholder="Ingresa Cantidad" aria-label="Search">
        <select class="form-select form-control me-2" id="ubication" name="ubication" required><option selected disabled value="">UBICACIONES</option></select>
        <select class="form-select form-control me-2" id="category" name="category" required><option selected disabled value="">CATEGORIAS</option></select>
        <select class="form-select form-control me-2" id="commission" name="commission" required><option selected disabled value="">AREA</option></select>
        <button class="btn btn-primary" type="submit">${ this.btnname }</button>
        <button id="btn-clear-search" class="btn btn-secondary" type="reset">Limpiar</button>
      </form>
    </div>`;
  }

  render(){
    this.innerHTML = `${this.template()}`;
  }
  
  connectedCallback() {
    this.render();
  }
}

customElements.define('form-search-component', FormSearch);