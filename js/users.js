"use strict";
let nameValidator = false;
let descriptionValidator = false;
let enabledValidator = false;

const divErrorName = document.getElementById('divErrorName');
const divErrorDescription = document.getElementById('divErrorDescription');
const divErrorEnabled = document.getElementById('divErrorEnabled');

// Show Alert
const alertMessage = document.getElementById('alert-msg');

const btnNewRegister =document.getElementById('btn_create_register');
const btnEditRegisterAction =document.getElementById('btnEditRegister');

const myModal = new bootstrap.Modal('#myModal', { keyboard: false });
const modalRegister = document.getElementById('myModal');
const btnCreateRegister = document.getElementById(`save_register`);
const btnEditRegister = document.getElementById(`edit_register`);

// Show table 
const titlesTable = [ 'ID', 'Nombre', 'Correo', 'Rol', 'Direccion', 'Telefono', 'Habilitado', 'Acciones'];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

const formRegister = document.getElementById('createRegister');
const idInput = document.getElementById('uid');
const nameInput = document.getElementById('name');
const addressInput = document.getElementById('address');
const emailInput = document.getElementById('email');
const codeInput = document.getElementById('code');
const phoneInput = document.getElementById('phone');
const nationalityInput = document.getElementById('nationality');
const roleInput = document.getElementById('rol');
const enabledInput = document.getElementById('enabled');
    
const printList = async ( data, limit = 10 ) => {
  table.innerHTML = "";
  if( data.length === 0 || !data ) {
    showMessegeAlert( alertMessage, 'No se encontraron registros', true );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  for (const i in data ) {
    const { id, name, email, address, code, phone, role_name, enabled } = data[i];
    const actions = [
      `<button type="button" id='btnEditRegister' onClick='showModalCreateOrEdit(${ id }, "EDIT")' value=${ id } class="btn btn-success rounded-circle"><i class="fa-solid fa-pen"></i></button>`
    ]
    const phoneComplete = phone ? `${code + phone.toString()}` : '-';
    const rowClass  = 'text-right';
    const customRow = `<td>${ [ id, name, email, role_name, address, phoneComplete, showBadgeBoolean(enabled), showbtnCircle(actions)].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
  // paginado( Math.ceil( data.length / limit ) );
}

// Show all registers in the table
const showData = async () => {
  const registers = await consulta( api + 'user');
  printList( registers.data );
}

const sendInfo = async (uid = '', action = 'CREATE'|'EDIT') => {
  nameValidator = validateAllfields(nameInput, divErrorName);
  if (!nameValidator) return console.log('Ingrese Nombre');
  
  const data = {
    name: nameInput.value.toUpperCase(),
    email: emailInput.value,
    address: addressInput.value.toUpperCase(),
    code: codeInput.value,
    phone: phoneInput.value,
    role: roleInput.value,
    country_id: nationalityInput.value,
    enabled :enabled.value,
    user: userId
  }
  
  const result = await actionWithData( data, uid, 'user' );
  if (!result) return showMessegeAlert( alertMessage, 'Error al editar el registro', true);
  await showData();
  bootstrap.Modal.getInstance(modalRegister).hide();
  document.querySelector(".modal-backdrop").remove();
  showMessegeAlert( alertMessage, action == 'EDIT' ? `Registro Editado` : 'Registro Creado');
}

async function showModalCreateOrEdit( id_info ) {
  myModal.show();
  formRegister.reset();

  toggleMenu('edit_register', true);
  toggleMenu('save_register', false);
  
  const data = await consulta( api + 'user/' + id_info );  
  console.log(data);
  
  const { id, name, email, role, address, country_id, code, phone, enabled } = data;

  idInput.value = id;
  nameInput.value =  name;
  addressInput.value = address;
  emailInput.value =  email;
  codeInput.value = code;
  phoneInput.value = phone;
  roleInput.value = role;
  nationalityInput.value = country_id
  enabledInput.value = enabled;
}
function clearForm() {
  formRegister.reset();
  const codeCurrent = JSON.parse(localStorage.getItem("code")).filter(e => e.id == country)[0].code;
  formRegister.reset();
  codeInput.value = codeCurrent;
  nationalityInput.value = country;
  enabledInput.value = true;
  roleInput.value = 1;
}

btnNewRegister.addEventListener('click', () => {
  clearForm();  
  toggleMenu( 'edit_register', false );
  toggleMenu( 'save_register', true );
});

document.querySelector(`#save_register`).addEventListener('click', async (e) => {
  e.preventDefault();
  await sendInfo('', 'CREATE');
});

btnEditRegister.addEventListener('click', async (e) => await sendInfo(idInput.value, 'EDIT'));
const showOptionsCode = async ( select) => {
  const selectElement = document.getElementById( select );
  selectElement.value = "";
  let options = JSON.parse(localStorage.getItem( select )) || [];
  
  if (!options.length) {
    const result = await consulta( api + `country` );
    options = result.data;
    localStorage.setItem( select, JSON.stringify( options ));
  }
  // Iteramos sobre el array de opciones
  options.filter(c => c.code !== '').forEach(option => {
    
    const { id, code } = option;
    const optionElement = `<option value="${ code }" code=${id} >${ code }</option>`;
    selectElement.innerHTML += optionElement;
  });
};

// Al abrir la pagina
// Al abrir la pagina
window.addEventListener("load", async () => {
  await onLoadSite()
  await showOptions('rol', api + `role`);
  await showOptions('nationality', api + `country`);
  await showOptionsCode('code');
});