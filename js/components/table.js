class Table extends HTMLElement {
  constructor() {
    super();
    this.attributesComponents = [
      this.name = 'Lista de Registros', //Aqui puedes darle Definiciones por defecto
      this.classname = 'table table-striped table-xl table-bordered table-hover table-responsive-xxl'
    ];
  }
  
  static get observedAttributes(){ return ['name', 'classname']; }
  attributeChangedCallback(attribute, _, newAttr){
    this.attributesComponents = [...this.attributesComponents, attribute]
    this[attribute] = newAttr;
  }
  connectedCallback() {
    this.innerHTML = `
    <div class="container">
      <table id="table_registros" class="${this.classname}">
        <caption>${this.name}</caption>
        <thead id="list_titles" class="table-dark"></thead>
        <tbody id="list_row"></tbody>
      </table>
      
      <div id="pagination-container" class="pagination-container"></div>
      
      <nav aria-label="...">
        <ul id="indice" class="pagination justify-content-center"></ul>
      </nav>

      <div id="pagination-container" class="pagination-container"></div>
    </div>  
    `;
  }
}

customElements.define('table-component', Table);