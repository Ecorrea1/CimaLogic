class Modal extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
        <!-- Vertically centered modal -->
        <div class="modal" id="myModal" tabindex="-1" aria-labelledby="myModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-fullscreen-xl-down modal-xl">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title"></h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body">
                    <form class="row g-2 container" id="createRegister">
                        <label class="h2">Datos del Cliente</label>
                        <div class="col-md-4">
                          <label for="age" class="form-label">RUT</label>
                          <input type="text" maxlength="10" placeholder="11111111" class="form-control" id="age" name="age" value="" required>
                          <div id="divErrorAge"></div>
                        </div>
                        <div class="col-md-12">
                          <label for="name" class="form-label">Nombre</label>
                          <input type="text" class="form-control" id="name" name="name" placeholder="Ingrese Nombre Completo" required>
                          <div id="divErrorName"></div> 
                        </div>
                        <div class="col-md-4">
                          <label for="dateAttention" class="form-label">Fecha Atencion</label>
                          <input type="date" class="form-control" id="date_attention" name="date_attention" placeholder="Ingrese fecha de atencion al cliente" required>
                          <div id="divErrorDateAttention"></div>                  
                        </div>
            
                        <div class="col-md-4">
                          <label for="phone" class="form-label ">Telefono</label>
                          <div class="input-group">
                            <span class="input-group-text" id="inputGroupPrepend3">+569</span>
                            <input type="tel" min="8" max="8" class="form-control" id="phone" name="phone" placeholder="12345678" required>
                          <div id="divErrorPhone"></div>
                          </div>
                        </div>
                        <hr>
                        <label class="h2">Datos del Costo</label>
                        <div class="col-md-6">
                          <label for="total" class="form-label">Valor</label>
                          <div class="input-group">
                            <span class="input-group-text" id="inputGroupPrepend3">$</span>
                            <input type="number" min="1" class="form-control" id="total" name="total" required>
                            <div id="divErrorTotal"></div>
                          </div>  
                        </div>
    
                        <hr>
    
                        <label class="h2">Informe de Cristal</label>
                        <label class="h4">LEJOS</label>
                        <label class="h6">OJO DERECHO</label>
                        <div class="col-md-3">
                          <label for="farEyeRightSphere" class="form-label">ESFERA</label>
                          <input type="number" class="form-control" step="0.01" min="-99.99" max="99.99" id="farEyeRightSphere" name="farEyeRightSphere" placeholder="0.0" value="0">
                          <div id="divErrorfarEyeRightSphere"></div>                  
                        </div>
                        <div class="col-md-3">
                          <label for="farEyeRightCylinder" class="form-label">CILINDRO</label>
                          <input type="number" step="0.01" min="-99.99" max="99.99" class="form-control" id="farEyeRightCylinder" name="farEyeRightCylinder" placeholder="0.0" value="0">
                          <div id="divErrorfarEyeRightCylinder"></div>
                        </div>
                      
                        <div class="col-md-3">
                          <label for="farEyeRightGrade" class="form-label ">GRADOS</label>
                          <div class="input-group">
                            <input type="number" min="0" max="999" class="form-control" id="farEyeRightGrade" name="farEyeRightGrade" placeholder="0" value="0">
                            <span class="input-group-text" id="inputGroupPrepend3">°</span>
                          <div id="divErrorfarEyeRightGrade"></div>
                          </div>
                        </div>
    
                        <div class="col-md-3">
                          <label for="farEyeRightPupillaryDistance" class="form-label ">DISTANCIA PUPILAR</label>
                          <div class="input-group">
                            <input type="number" min="0" max="999" class="form-control" id="farEyeRightPupillaryDistance" name="farEyeRightPupillaryDistance" placeholder="0">
                            <span class="input-group-text" id="inputGroupPrepend3">mm</span>
                          <div id="divErrorfarEyeRightPupillaryDistance"></div>
                          </div>
                        </div>
    
                        <label class="h6">OJO IZQUIERDO</label>
                        <div class="col-md-3">
                          <label for="farEyeLeftSphere" class="form-label">ESFERA</label>
                          <input type="number" class="form-control" step="0.01" min="-99.99" max="99.99" id="farEyeLeftSphere" name="farEyeLeftSphere" placeholder="0.0" value="0" >
                          <div id="divErrorfarEyeLeftSphere"></div>                  
                        </div>
                        <div class="col-md-3">
                          <label for="farEyeLeftCylinder" class="form-label">CILINDRO</label>
                          <input type="number" step="0.01" min="-99.99" max="99.99" class="form-control" id="farEyeLeftCylinder" name="farEyeLeftCylinder" placeholder="0.0" value="0">
                          <div id="divErrorfarEyeLeftCylinder"></div>
                        </div>
                      
                        <div class="col-md-3">
                          <label for="farEyeLeftGrade" class="form-label ">GRADOS</label>
                          <div class="input-group">
                            <input type="number" min="0" max="999" class="form-control" id="farEyeLeftGrade" name="farEyeLeftGrade" placeholder="0" value="0">
                            <span class="input-group-text" id="inputGroupPrepend3">°</span>
                          <div id="divErrorfarEyeLeftGrade"></div>
                          </div>
                        </div>
    
                        <div class="col-md-3">
                          <label for="farEyeLeftPupillaryDistance" class="form-label ">DISTANCIA PUPILAR</label>
                          <div class="input-group">
                            <input type="number" min="0" max="999" class="form-control" id="farEyeLeftPupillaryDistance" name="farEyeLeftPupillaryDistance" placeholder="0" >
                            <span class="input-group-text" id="inputGroupPrepend3">mm</span>
                          <div id="divErrorfarEyeLeftPupillaryDistance"></div>
                          </div>
                        </div>
    
                        <label class="h4">CERCA</label>
                        <div class="col-md-3">
                          <label for="nearEyeRightSphere" class="form-label">ADD</label>
                          <input type="number" class="form-control" step="0.01" min="0.0" max="99.99" id="nearEyeRightSphere" name="nearEyeRightSphere" placeholder="0.0" value="0.0" >
                          <div id="divErrorNearEyeRightSphere"></div>                  
                        </div>
    
                        <hr>
                        <label class="h2">Datos del Lente</label>
    
                        <div class="col-md-12 ms-auto">
                          <label for="cristal" class="form-label">Cristal</label>
                          <select class="form-select" id="cristal" name="cristal" required>
                            <option value="">Tipos de cristales</option>
                          </select>
                          <div id="divErrorCristal"></div>
                        </div>
                               
                        <div class="col-md-12 ms-auto">
                          <label for="treatment" class="form-label">Tratamiento</label>
                          <select class="form-select" id="treatment" name="treatment" required>
                            <option selected value="">Tipos de tratamientos</option>
                          </select>
                          <div id="divErrorTreatment"></div>
                        </div>
                        
                        <div class="col-md-12">
                          <label for="frame" class="form-label">Armazon</label>
                          <input type="text" class="form-control" id="frame" name="frame" placeholder="Ingrese Modelo" required>
                          <div id="divErrorFrame"></div>
                        </div>
    
                        <hr>
                        <label class="h2">Datos de Atencion</label>
                        <div class="col-md-12 ms-auto">
                          <label for="professional" class="form-label">Profesional</label>
                          <input type="text" class="form-control" id="professional" name="professional" placeholder="Ingrese Profesional de Atencion" required>
                          <div id="divErrorProfessional"></div>
                        </div>
                        <div class="col-md-12">
                          <label for="observation" class="form-label">Observaciones</label>
                          <textarea class="form-control" id="observation" name="observation"></textarea>
                        </div>
                        <br>
                        
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