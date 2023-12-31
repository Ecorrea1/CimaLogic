class ModalMissionary extends HTMLElement {
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
                    <div class="col-md-4">
                      <label for="name" class="form-label">Nombre</label>
                      <input type="text" class="form-control text-uppercase" id="name" name="name" placeholder="JACK" required>
                      <div id="divErrorName"></div> 
                    </div>
                    
                    <div class="col-md-4">
                      <label for="name" class="form-label">Apellido Paterno</label>
                      <input type="text" class="form-control text-uppercase" id="name" name="name" placeholder="Sparrow" required>
                      <div id="divErrorName"></div> 
                    </div>
                    
                    <div class="col-md-4">
                      <label for="name" class="form-label">Apellido Materno</label>
                      <input type="text" class="form-control text-uppercase" id="name" name="name" placeholder="Galaxia" >
                      <div id="divErrorName"></div> 
                    </div>
                    
                    <div class="col-md-4">
                      <label for="email" class="form-label">Correo</label>
                      <input type="email" class="form-control text-uppercase" id="email" name="email" placeholder="jack.sparrow@movida.com" >
                      <div id="divErrorName"></div> 
                    </div>

                    <div class="col-md-2 ms-auto">
                      <label for="code" class="form-label">Codigo</label>
                      <select class="form-select" id="code" name="code" required>
                        <option selected value="569">+569</option>
                        <option value="569">+579</option>
                      </select>
                      <div id="divErrorCode"></div>
                    </div>

                    <div class="col-md-6">
                      <label for="email" class="form-label">Telefono</label>
                      <input type="email" class="form-control text-uppercase" id="email" name="email" placeholder="jack.sparrow@movida.com" >
                      <div id="divErrorName"></div> 
                    </div>

                    <div class="col-md-6 ms-auto">
                      <label for="country" class="form-label">Pais</label>
                      <select class="form-select" id="country" name="country" required>
                        <option selected value="1">CHILE</option>
                        <option value="2">ARGENTINA</option>
                      </select>
                      <div id="divErrorCountry"></div>
                    </div>
                    
                    <div class="col-md-6 ms-auto">
                      <label for="natinality" class="form-label">Nacionalidad</label>
                      <select class="form-select" id="natinality" name="natinality" >
                        <option selected value="true">CHILE</option>
                        <option value="false">ARGENTINA</option>
                      </select>
                      <div id="divErrorNatinality"></div>
                    </div>
                
                    <label for="perfil-group" class="form-label">PERFIL</label>
                    <div class="input-group col-md-12 ms-auto" id="perfil-group">
                    
                        <div class="form-check form-check-inline form-check-reverse">
                          <input class="form-check-input" type="checkbox" value="1" id="flexCheckDefault">
                          <label class="form-check-label" for="flexCheckDefault"> PARTICIPANTE </label>
                        </div>

                        <div class="form-check form-check-inline form-check-reverse">
                          <input class="form-check-input" type="checkbox" value="2" id="flexCheckDefault">
                          <label class="form-check-label" for="flexCheckDefault">VOLUNTARIO</label>
                        </div>
                          
                        <div class="form-check form-check-inline form-check-reverse">
                          <input class="form-check-input" type="checkbox" value="3" id="flexCheckChecked" checked>
                          <label class="form-check-label" for="flexCheckChecked">ORADOR</label>
                        </div>
                        
                        <div class="form-check form-check-inline form-check-reverse">
                          <input class="form-check-input" type="checkbox" value="4" id="flexCheckChecked" checked>
                          <label class="form-check-label" for="flexCheckChecked">MISIONERO</label>
                        </div>
                    
                      <div id="divErrorPerfil"></div>
                    
                    </div>


                    <div class="col-md-12">
                        <label for="description" class="form-label">Observacion</label>
                        <textarea class="form-control" placeholder="Ingresa la descripcion de este material" id="description"></textarea>
                        <label for="floatingTextarea2">Ingresa la descripcion</label>
                        <div id="divErrorDescription"></div>                  
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
  
  customElements.define('modal-missionary-component', ModalMissionary);