"use strict";
let nameValidator = false;
let emailValidator = false;
let phoneValidator = false;
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
const titlesTable = [ 'ID', 'Nombre',  'Pastor',  'Direccion','Correo', 'Telefono', 'Pais', 'Habilitado', 'Acciones'];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

const formRegister = document.getElementById('createRegister');
const idInput = document.getElementById('uid');
const nameInput = document.getElementById('name');
const pastorInput = document.getElementById('pastor');
const addressInput = document.getElementById('address');
const emailInput = document.getElementById('email');
const countryInput = document.getElementById('residence');
const codeInput = document.getElementById('code');
const phoneInput = document.getElementById('phone');
const enabledInput = document.getElementById('enabled');
    
const printList = async ( data, limit = 10 ) => {
  table.innerHTML = "";
  if( data.length === 0 || !data ) {
    showMessegeAlert( false, 'No se encontraron registros' );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  for (const i in data ) {
    const { id, name, pastor, address, email, code,phone, country_id,  enabled } = data[i];
    const actions = [
      `<button type="button" id='btnEditRegister' onClick='showModalCreateOrEdit(${ id }, "EDIT")' value=${ id } class="btn btn-success rounded-circle"><i class="fa-solid fa-pen"></i></button>`
    ]
    const rowClass  = 'text-right';
    const customRow = `<td>${ [ id, name, pastor, address, email, code + phone, country_id, showBadgeBoolean(enabled), actions].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
  paginado('#table_registros');
}

// Show all registers in the table
const showData = async () => {
  const registers = await consulta( api + 'church');
  printList( registers.data );
}


const sendInfo = async (uid = '', action = 'CREATE'|'EDIT') => {
  nameValidator = validateAllfields(nameInput, divErrorName);
  if (!nameValidator) return console.log('Ingrese Nombre');
  
  const data = {
    name: nameInput.value.toUpperCase(),
    email: emailInput.value,
    pastor: pastorInput.value.toUpperCase(),
    address: addressInput.value.toUpperCase(),
    code: codeInput.value,
    phone: phoneInput.value,
    country_id: countryInput.value.toUpperCase(),
    enabled :enabled.value,
    user: userId
  }

  const result = await createEditData( data, uid );
  if (!result) return showMessegeAlert( true, 'Error al editar el registro');
  await showData();
  bootstrap.Modal.getInstance(modalRegister).hide();
  document.querySelector(".modal-backdrop").remove();
  showMessegeAlert( false, action == 'EDIT' ? `Registro Editado` : 'Registro Creado');
}

const createEditData = async ( data, uid = '') => {  
  const query = uid == '' ? 'church' : `church/${ uid }`
  return await fetch( api + query , {
    method: uid ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(response => {
      console.log(response.ok);
      return true;
    }
  )
  .catch(err => {
    console.error(err)
    return false;
  });
}

async function showModalCreateOrEdit( uid ) {
    myModal.show();
    formRegister.reset();
  
    toggleMenu('edit_register', true);
    toggleMenu('save_register', false);
    
    const register = await consulta( api + 'church/' + uid );
    const {  name, pastor, address, email, code, phone, country_id,  enabled } = register;
  
    idInput.value = uid;
    nameInput.value =  name;
    pastorInput.value = pastor;
    addressInput.value= address;
    emailInput.value = email;
    codeInput.value = code;
    phoneInput.value = phone;
    countryInput.value = country_id;
    enabledInput.value = enabled;
}

function clearForm() {
  
  const codeCurrent = JSON.parse(localStorage.getItem("code")).filter(e => e.id == country)[0].code;
  formRegister.reset();
  codeInput.value = codeCurrent;
  countryInput.value = country;
  enabledInput.value = true;
}

btnNewRegister.addEventListener('click', () => {
    clearForm()
    toggleMenu('edit_register', false);
    toggleMenu('save_register', true);
});

document.querySelector(`#save_register`).addEventListener('click', async (e) => {
  e.preventDefault();
  await sendInfo('', 'CREATE');
});

btnEditRegister.addEventListener('click', async (e) => await sendInfo(idInput.value, 'EDIT'));

const showOptionsCode = async ( select ) => {
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
    const optionElement = `<option value="${ code }" code="${id}" >${ code }</option>`;
    selectElement.innerHTML += optionElement;
  });
};


// Al abrir la pagina
window.addEventListener("load", async () => {
  await onLoadSite()
  await showOptions('residence', api + `country`);
  await showOptionsCode('code');
});