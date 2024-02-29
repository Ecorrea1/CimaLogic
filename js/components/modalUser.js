class ModalUser extends HTMLElement {
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
          <div class="modal fade" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="${this.classname}">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">${this.titleModal}</h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
  
                  <form class="row g-3 container" id="createRegister">
                    <div class="col-md-6">
                      <label for="name" class="form-label">Nombre</label>
                      <input type="text" class="form-control text-uppercase" id="name" name="name" placeholder="JACK" required>
                      <div id="divErrorName"></div> 
                    </div>
                    <div class="col-md-6">
                      <label for="address" class="form-label">Direccion</label>
                      <input type="text" class="form-control text-uppercase" id="address" name="address" placeholder="BRASIL 107" required>
                      <div id="divErrorAddress"></div> 
                    </div>
                
                    <div class="col-md-4">
                      <label for="email" class="form-label">Correo</label>
                      <input type="email" class="form-control text-uppercase" id="email" name="email" placeholder="jack.sparrow@movida.com" >
                      <div id="divErrorName"></div> 
                    </div>

                    <div class="col-md-2 ms-auto">
                      <label for="code" class="form-label">Codigo</label>
                      <select class="form-select" id="code" name="code" required>
                      <option selected disabled value="">Codigo de area</option>
                      </select>
                      <div id="divErrorCode"></div>
                    </div>

                    <div class="col-md-6">
                      <label for="phone" class="form-label">Telefono</label>
                      <input type="tel" class="form-control" id="phone" minlength="8" maxlength="14" name="phone" placeholder="12345678" required>
                      <div id="divErrorPhone"></div> 
                    </div>

                    <div class="col-md-6 ms-auto">
                      <label for="rol" class="form-label">Rol</label>
                      <select class="form-select" id="rol" name="rol" required>
                      <option selected disabled value="">Elegir Rol</option>
                      </select>
                      <div id="divErroRol"></div>
                    </div>

                    <div class="col-md-6 ms-auto">
                      <label for="nationality" class="form-label">SEDE</label>
                      <select class="form-select" id="nationality" name="nationality" >
                      <option selected disabled value="">Sede de Movida</option>
                      </select>
                      <div id="divErrorNationality"></div>
                    </div>

                    <div class="col-md-4">
                      <label for="password" class="form-label d-none">Contraseña</label>
                      <input type="password" class="form-control d-none" id="password" name="password" placeholder="***************" >
                      <div id="divErrorName"></div> 
                    </div>
  
                    <div class="col-md-12 ms-auto">
                      <label for="enabled" class="form-label">Habilitado</label>
                      <select class="form-select" id="enabled" name="enabled" required>
                        <option selected value="true">ACTIVO</option>
                        <option value="false">DESACTIVADO</option>
                      </select>
                      <div id="divErrorenabled"></div>
                    </div>
  
                    <input type="text" class="d-none" id="uid" name="uid">
  
                    <div class="col-sm-12 d-grid gap-2">
                      <button class="btn btn-primary btn-lg" type="submit" id="save_register">Crear Registro</button>
                      <button class="btn btn-primary btn-lg d-none" type="button" id="edit_register">Editar Registro</button>
                    </div>
                  </form>
  
                </div>
              </div>
            </div>
          </div>`;
      }
  }
  
  customElements.define('modal-user-component', ModalUser);