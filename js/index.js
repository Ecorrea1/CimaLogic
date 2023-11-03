"use strict";
let nameValidator = false;
let descriptionValidator = false;
let categoryValidator = false;
let ubicationValidator = false;
let commissionValidator = false;
let quantityValidator = false;
let enabledValidator = false;

// Inputs of Modal to create register
const formCreateEditRegister = document.getElementById('createRegister');
const idInput = document.getElementById('uid');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const categoryInput = document.getElementById('category');
const ubicationInput = document.getElementById('ubication');
const commissionInput = document.getElementById('commission');
const quantityInput = document.getElementById('quantity');
const observationInput = document.getElementById('observation');
const enabledInput = document.getElementById('enabled');

// const btnNewRegister =document.getElementById('btn_create_register');
const btnCreateRegister = document.getElementById('create_register');
const btnSaveRegister = document.getElementById('save_register');
const btnEditRegister = document.getElementById('edit_register');
const btnReset = document.getElementById('btnReset');
const btnClearSearch = document.getElementById('btn-clear-search');

const divErrorName = document.getElementById('divErrorName');
const divErrorDescription = document.getElementById('divErrorDescription');
const divErrorCategory = document.getElementById('divErrorCategory');
const divErrorUbication = document.getElementById('divErrorUbication');
const divErrorCommission = document.getElementById('divErrorCommission');
const divErrorQuantity = document.getElementById('divErrorQuantity');
const divErrorEnabled = document.getElementById('divErrorEnabled');
const divErrorObservation = document.getElementById('divErrorObservation');

// Show Alert
const alertMsg = document.getElementById('alert-msg');

// Formulario de busqueda
const formSearch = document.getElementById('form-search');
const nameSearchInput = document.getElementById('nameSearch');
const rutSearchInput = document.getElementById('rutSearch');
const phoneSearchInput = document.getElementById('phoneSearch');
const dateAttentionInputSearch = document.getElementById('dateAttentionSearch');

// Show table 
const titlesTable = [ 'ID', 'Nombre', "Descripcion", "Categoria", "Ubicacion", "Cantidad", "Grupo", 'Habilitado', "Observaciones",  "Creado",  "Actualizado", 'Acciones' ];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

// Show pagination elements
const pageItem = document.getElementsByClassName('page-item');

// Show modal to create register
const myModal = new bootstrap.Modal('#myModal', { keyboard: false });

// Show titles of table
const showTitlesTable = () => {
    let titles = '';
    for (const i in titlesTable ) titles += `<th>${ titlesTable[i] }</th>`;
    tableTitles.innerHTML = `<tr>${ titles }</tr>`;
}
function consulta  ( url ) {
  return new Promise(( resolve, reject ) => {
    fetch( url, { method: 'GET', redirect: 'follow' } )
    .then( response => response.json() )
    .then( data => { resolve( JSON.parse( JSON.stringify( data ) ) ); })
    .catch( err => { console.log( err ) } )
  });
}
const printList = async ( data ) => {
  table.innerHTML = "";
  if( data.length == 0 || !data ) {
    showMessegeAlert( false, 'No se encontraron registros' );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  for (const i in data ) {
    const { id, name, description, category, ubication, quantity, commission, enabled, observations, createdAt,  updatedAt } = data[i];
    const actions = [
      `<button type="button" id='btnShowRegister' onClick='showModalCreateOrEdit(${ id },${true}, "show_register")' value=${ id } class="btn btn-primary">VER</button>`,
    //   `<button type="button" id='btnEditRegister' onClick='showModalCreateOrEdit(${ id }, ${false}, "edit_register")' value=${ id } class="btn btn-success">EDITAR</button>`,
    ]

    const rowClass = 'text-right';
    const customRow = `<td>${ [ id, name, description, category, ubication, quantity, commission, showBadgeBoolean(enabled), observations,  createdAt,  updatedAt, actions ].join('</td><td>') }</td>`;
    const row = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
}

// Show all registers in the table
const showRegisters = async () => {
    const registers = await consulta( api + 'registers');
    printList( registers.data );
  }
  
  // Show register by id
  const showRegistersForId = async ( id ) => {
    const register = await consulta( api + 'registers/' + id );
    printList( register.data );
  }
  
  // Show register by filters
  const showRegistersForFilters = async ( filters ) => {
    const register = await consulta( api + 'registers/' + filters );
    printList( register.data );
  }

  // Show options in select 
const showOptions = async ( select, url ) => {
  document.getElementById(select).innerHTML = "";
  const result = await consulta( url );
  const options = result.data;
  for (const i in options ) {
    const { id, name } = options[i];
    const option = `<option value="${ id }">${ name }</option>`;
    document.getElementById( select ).innerHTML += option;
  }
}

const showInitModal = async () => {
  await showOptions('ubication', api + 'ubication');
  await showOptions('category', api + 'category');
  await showOptions('commission', api + 'commission');
}

const showTablePagination = async ( page = 1, limit = 10 ) => {
  // const registers = await consulta( api + 'product?page=' + page + '&limit=' + limit );
  const registers = await consulta( api + 'product' );
  printList( registers.data );
}
const searchRegister = async ( searchQuery ) => {
  const register = await consulta( api + 'product/search?page=1' + searchQuery );
  printList( register.data );
}
  
formSearch.addEventListener('submit', async(e) => {
  e.preventDefault();
  if ( rutSearchInput.value === '' && nameSearchInput.value === ''  === '' && dateAttentionInputSearch.value === '' ) {
    await showTablePagination();
  } else {
    const searchQuery = '&id=' + parseInt(rutSearchInput.value) + '&name=' + nameSearchInput.value + '&date_attention=' + dateAttentionInputSearch.value;
    await searchRegister( searchQuery );
  }
});
function showMessegeAlert ( isErro = false, message, time = 3000 ) {
  alertMsg.classList.add(isErro ? 'alert-danger' : 'alert-success');
  alertMsg.classList.remove(isErro ? 'alert-success' : 'alert-danger');
  alertMsg.textContent = message;
  alertMsg.style.display = 'block';
  setTimeout(() => alertMsg.style.display = 'none', time);
}

async function showModalCreateOrEdit( uid, btnAction ) {
  myModal.show();
  formCreateEditRegister.reset();

  const register = await consulta( api + 'category/' + uid );
  toggleMenu('edit_register', true);
  toggleMenu('save_register', false);
  
  const { name, description, quantity, category, ubication, commission, observations, enabled } = register.data;

  idInput.value = uid;
  nameInput.value =  name;
  descriptionInput.value = description ?? '';
  categoryInput.value = category
  ubicationInput.value = ubication
  commissionInput.value = commission
  quantityInput.value = quantity ?? 0;
  observationInput.value = observations ?? '';
  enabledInput.value = enabled;
}

btnCreateRegister.addEventListener('click', () => {
  clearForm()
  toggleMenu('edit_register', false);
  toggleMenu('save_register', true);
});

function clearForm() {
  // modalTitle.textContent = ''

  idInput.value = ''
  nameInput.value = ''
  descriptionInput.value = ''
  categoryInput.value = ''
  ubicationInput.value = ''
  commissionInput.value = ''
  quantityInput.value = ''
  observationInput.value = ''
  enabledInput.value = ''
  
  idInput.style.borderColor = 'hsl(270, 3%, 87%)'
  nameInput.style.borderColor = 'hsl(270, 3%, 87%)'
  descriptionInput.style.borderColor = 'hsl(270, 3%, 87%)'
  categoryInput.style.borderColor = 'hsl(270, 3%, 87%)'
  ubicationInput.style.borderColor = 'hsl(270, 3%, 87%)'
  commissionInput.style.borderColor = 'hsl(270, 3%, 87%)'
  quantityInput.style.borderColor = 'hsl(270, 3%, 87%)'
  observationInput.style.borderColor = 'hsl(270, 3%, 87%)'
  enabledInput.style.borderColor = 'hsl(270, 3%, 87%)'

  divErrorName.innerHTML = ''
  divErrorDescription.innerHTML = ''
  divErrorCategory.innerHTML = ''
  divErrorUbication.innerHTML = ''
  divErrorCommission.innerHTML = ''
  divErrorQuantity.innerHTML = ''
  divErrorEnabled.innerHTML = ''
  divErrorObservation.innerHTML = ''
}

// btnCreateRegister.addEventListener('click', () => {
//   toggleMenu(btnEditRegister.id, false);
//   toggleMenu(btnSaveRegister.id, true);
// });

window.addEventListener("load", async() => {
    dateAttentionInputSearch.max = new Date().toISOString().substring(0,10);
    showTitlesTable();
    await showTablePagination();
    await showInitModal();
    const fader = document.getElementById('fader');
    fader.classList.add("close");
    fader.style.display = 'none';
  }
)