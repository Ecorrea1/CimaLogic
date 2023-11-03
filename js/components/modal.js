class Modal extends HTMLElement {
    constructor() {
        super();
        this.attributesComponents = [
          this.name = 'Ingresa tu titulo',
          this.classname = 'modal-dialog modal-fullscreen-xl-down modal-xl',
          this.titleModal = 'Datos de Registro'
        ];
    }

    static get observedAttributes(){ return ['name', 'classname', 'titleModal']; }

  attributeChangedCallback(attribute, _, newAttr){
    this.attributesComponents = [...this.attributesComponents, attribute]
    this[attribute] = newAttr;
  }

    connectedCallback() {
        this.innerHTML = `
        <div class="modal" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="${this.classname}">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title">${this.titleModal}</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form class="row g-2 container" id="createRegister">
                        <label class="h3">Datos del Producto</label>
                        
                        <div class="col-md-8">
                          <label for="name" class="form-label">Nombre</label>
                          <input type="text" class="form-control" id="name" name="name" placeholder="Ingrese nombre de producto" required>
                          <div id="divErrorName"></div> 
                        </div>

                        <div class="col-md-4">
                          <label for="quantity" class="form-label">Cantidad</label>
                          <input type="number" maxlength="10" placeholder="Ingresa cantidad" class="form-control" id="quantity" name="quantity" value="" required>
                          <div id="divErrorQuantity"></div>
                        </div>  

                        <div class="col-md-12">
                          <label for="description" class="form-label">Descripcion</label>
                          <textarea class="form-control" id="description" name="description"></textarea>
                          <div id="divErrorDescription"></div>
                        </div>        
    
                        <div class="col-md-12 ms-auto">
                          <label for="commission" class="form-label">Comision</label>
                          <select class="form-select" id="commission" name="commission" required>
                            <option selected disabled value="">--Seleccionar--</option>
                          </select>
                          <div id="divErrorCommission"></div>
                        </div>

                        <div class="col-md-12 ms-auto">
                          <label for="category" class="form-label">Categoria</label>
                          <select class="form-select" id="category" name="category" required>
                            <option selected disabled value="">--Seleccionar--</option>
                          </select>
                          <div id="divErrorCategory"></div>
                        </div>
                               
                        <div class="col-md-12 ms-auto">
                          <label for="ubication" class="form-label">Ubicaciones</label>
                          <select class="form-select" id="ubication" name="ubication" required>
                            <option selected disabled value="">--Seleccionar--</option>
                          </select>
                          <div id="divErrorUbication"></div>
                        </div>
                        
                        <div class="col-md-12 ms-auto">
                          <label for="enabled" class="form-label">Habilitado</label>
                          <select class="form-select" id="enabled" name="enabled" required>
                            <option selected value="true">ACTIVO</option>
                            <option value="false">DESACTIVADO</option>
                          </select>
                          <div id="divErrorenabled"></div>
                        </div>

                        <div class="col-md-12">
                          <label for="observation" class="form-label">Observaciones</label>
                          <textarea class="form-control" id="observation" name="observation"></textarea>
                          <div id="divErrorObservation"></div>
                        </div>
                        
                     
                        <input type="text" class="d-none" id="uid" name="uid">
    
                        <div class="col-sm-12 d-grid gap-2">
                          <button class="btn btn-primary btn-lg" type="submit" id="save_register">Crear Registro</button>
                          <button class="btn btn-primary btn-lg d-none" type="button" id="edit_register">Editar Registro</button>
                          <input class="btn btn-secondary btn-lg" type="reset" id="btnReset">
                        </div>
                      </form>
                  </div>
                </div>
              </div>
        </div>
        `;
    }
}

customElements.define('modal-component', Modal);