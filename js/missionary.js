"use strict";
let nameValidator = false;
let paternalSurnameValidator = false;
let maternalSurnameValidator = false;
let emailValidator = false;
let countrylValidator = false;
let nationalityValidator = false;
let profileValidator = false;
let phoneValidator = false;
let descriptionValidator = false;
let enabledValidator = false;

const divErrorName = document.getElementById('divErrorName');

// Show Alert
const alertMessage = document.getElementById('alert-msg');

const btnNewRegister =document.getElementById('btn_create_register');
const btnEditRegisterAction =document.getElementById('btnEditRegister');

const myModal = new bootstrap.Modal('#myModal', { keyboard: false });
const modalRegister = document.getElementById('myModal');
const btnCreateRegister = document.getElementById(`save_register`);
const btnEditRegister = document.getElementById(`edit_register`);

// Show table 
const titlesTable = [ 'ID', 'Nombre', 'Apellido Paterno', 'Apellido Materno', 'Correo', 'Telefono', 'Pais', 'Nacionalidad', 'Iglesia','Perfil', 'Observacion', 'Habilitado','Acciones'];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

const formRegister = document.getElementById('createRegister');
const idInput = document.getElementById('uid');
const nameInput = document.getElementById('name');
const paternalInput = document.getElementById('paternal_surname');
const maternalInput = document.getElementById('maternal_surname');
const emailInput = document.getElementById('email');
const countryInput = document.getElementById('residence');
const codeInput = document.getElementById('code');
const phoneInput = document.getElementById('phone');
const nationalityInput = document.getElementById('nationality');
const churchInput = document.getElementById( 'church' );
const profileInput = document.querySelector(`input[type="checkbox"]`);
const descriptionInput = document.getElementById('description');
const enabledInput = document.getElementById('enabled');
    
const printList = async ( data ) => {
  table.innerHTML = "";
  if( data.length === 0 || !data ) {
    showMessegeAlert( false, 'No se encontraron registros' );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  console.log(data);
  
  for (const i in data ) {
    const { id, name, paternal_surname, maternal_surname, email, code, phone, country, nationality, church, profile, observation, enabled } = data[i];
    const actions = [
      `<button type="button" id="btnEditRegister" onClick='showModalCreateOrEdit(${ id })' value=${ id } class="btn btn-success rounded-circle"><i class="fa-solid fa-pen"></i></button>`
    ]
    const phoneComplete = `${code}${phone}`;
    const rowClass  = 'text-right';
    const customRow = `<td>${ [ id, name, paternal_surname, maternal_surname, email, phoneComplete, country, nationality, changeStringNull(church,'-'), profile, changeStringNull(observation,'-'), showBadgeBoolean(enabled), actions].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
  paginado('#table_registros');
}

const changeColorOfProfile = (data) => {
  let colors;
  switch (data) {
    case "PARTICIPANTE":
      colors = '#5cb85c'; // green
      break;
    case "VOLUNTARIO":
      colors = '#f0ad4e'; // yellow
      break;
    case "ORADOR":
      colors = '#d9534f'; // red
      break;
    case "MISIONERO":
      colors = '#5bc0de'; // blue
      break;
    default:
      colors = '#d9534f'; // red
  }
  return colors;
};
// Show all registers in the table
const showData = async () => {
  const registers = await consulta( api + 'missionary');
  printList( registers.data );
}

const sendInfo = async (idMissionary = '', action = 'CREATE'|'EDIT') => {
  nameValidator = validateAllfields(nameInput, divErrorName);
  if (!nameValidator) return console.log('Ingrese Nombre');

  let checkboxes = document.querySelectorAll("input[type=checkbox]:checked")

// creamos un array con los valores de los checkbox
  let profileSelect = !!checkboxes ? Array.from(checkboxes).map(checkbox => checkbox.value).join(",") : '1';

  const data = {
    name: nameInput.value.toUpperCase(),
    email: emailInput.value,
    paternal_surname: paternalInput.value.toUpperCase(),
    maternal_surname: maternalInput.value.toUpperCase(),
    code: codeInput.value,
    phone: phoneInput.value,
    country_id: countryInput.value.toUpperCase(),
    nationality_id: nationalityInput.value.toUpperCase(),
    church: churchInput.value.toUpperCase(),
    profile: profileSelect,
    observation: descriptionInput.value,
    enabled :enabled.value,
    user: userId
  }
  
  const result = await createEditData( data, idMissionary );
  if (!result) return showMessegeAlert( alertMessage, 'Error al editar el registro', true);
  await showData();
  bootstrap.Modal.getInstance(modalRegister).hide();
  document.querySelector(".modal-backdrop").remove();
  showMessegeAlert(alertMessage, action == 'EDIT' ? `Registro Editado` : 'Registro Creado');
}

const createEditData = async ( data, uid = '') => {  
  const query = uid == '' ? 'missionary' : `missionary/${ uid }`
  return await fetch( api + query , {
    method: uid ? 'PUT' : 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then(response => response.ok )
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
    
    const register = await consulta( api + `missionary/${ uid }` );
    const { id, name, paternal_surname, maternal_surname, email, code, phone, country_id, nationality_id, church, profile, observation, enabled } = register;
    const array = profile.split(",").map(Number);
  
    idInput.value = id;
    nameInput.value =  name;
    paternalInput.value = paternal_surname;
    maternalInput.value = maternal_surname;
    emailInput.value =  email;
    codeInput.value = code;
    phoneInput.value = phone;
    countryInput.value = country_id;
    nationalityInput.value = nationality_id;
    churchInput.value = church;
    array.forEach(valor => { // recorremos el array con una función flecha
      const checkbox = document.querySelector(`input[type="checkbox"][value="${ valor }"]`); // seleccionamos el checkbox con el mismo valor usando una plantilla de cadena
      if (checkbox) checkbox.checked = true 
    });


    descriptionInput.value = observation ?? '';
    enabledInput.value = enabled;
}

function clearForm() {
  formRegister.reset();
  idInput.value = ''; 
  nameInput.value = '';
  paternalInput.value = '';
  maternalInput.value = '';
  emailInput.value = '';
  phoneInput.value = '';
  descriptionInput.value = '';
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
    const optionElement = `<option value="${ code }" code=${id} >${ code }</option>`;
    selectElement.innerHTML += optionElement;
  });
};

const showListChurchs = async (select = 'churchList') => {
  const selectElement = document.getElementById( select );
  selectElement.value = "";
  let options = JSON.parse(localStorage.getItem( select )) || [];
  
  if (!options.length) {
    const result = await consulta( api + `church` );
    options = result.data;
    localStorage.setItem( select, JSON.stringify( options ));
  }
  // Iteramos sobre el array de opciones
  options.filter(c => c.code !== '').forEach(option => {
    
    const { name } = option;
    const optionElement = `<option value="${name}">`;
    selectElement.innerHTML += optionElement;
  });
}

// Al abrir la pagina
window.addEventListener("load", async () => {
  await onLoadSite()
  await showOptions('residence', api + `country`);
  await showOptions('nationality', api + `country`);
  await showListChurchs('churchList');
  await showOptionsCode('code');
});