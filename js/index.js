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
const divErrorObservation = document.getElementById('divErrorObservation');

// Show Alert
const alertMessage = document.getElementById('alert-msg');

// Show modal to create register
const myModal = new bootstrap.Modal('#modalRegister', { keyboard: false });
const modalRegister = document.getElementById('modalRegister');

// Formulario de busqueda
const formSearch = document.getElementById('form-search');
const nameSearchInput = document.getElementById('nameSearch');
const commisionSearchInput = document.getElementById('commissionSearch');
const categorySearchInput = document.getElementById('categorySearch');
const ubicationSearchInput = document.getElementById('ubicationSearch');
const idSearchInput = document.getElementById('idSearch');

// Show table 
const titlesTable = [ 'ID', 'Nombre', "Descripcion", "Categoria", "Ubicacion", "Cantidad", "Area", 'Habilitado', "Observaciones", 'Acciones' ];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

// Show pagination elements
const pageItem = document.getElementsByClassName('page-item');


async function paginado( paginas, limit = 10){
  const totalPages =  paginas > 32 ? 32 : paginas
  for (let index = 0; index < totalPages; index++ ) document.getElementById("indice").innerHTML+= `<li class="page-item"><button class="page-link" onclick="printList(${ index * limit })">${ index + 1}</button></li>`;
}



const printList = async ( data ) => {
  table.innerHTML = "";
  if( data.length == 0 || !data ) {
    showMessegeAlert( false, 'No se encontraron registros' );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  for (const i in data ) {
    const { id, name, description, category, ubication, quantity, commission, enabled, observations } = data[i];
    const actions = [
      '<div class="btn-group" role="group">',
      `<button type="button" id='btnShowRegister' onClick='showModalCreateOrEdit(${ id }, "SHOW")' value=${ id } class="btn btn-primary rounded-circle"><i class="fa-solid fa-eye"></i></button>`,
      `<button type="button" id='btnEditRegister' onClick='showModalCreateOrEdit(${ id }, "EDIT")' value=${ id } class="btn btn-success rounded-circle"><i class="fa-solid fa-pen"></i></button>`,
      '</div>'
    ]

    const rowClass = 'text-left';
    const customRow = `<td>${ [ id, name, description, category, ubication, quantity, commission, showBadgeBoolean(enabled), observations, actions ].join('</td><td>') }</td>`;
    const row = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
  paginado( Math.ceil( data.length / 10 ) );
}

// Show all registers in the table
const showRegisters = async () => {
  const registers = await consulta( api + 'product/');
  printList( registers.data );
}

// Show register by id
const showRegistersForId = async ( id ) => {
  const register = await consulta( api + 'product/' + id );
  printList( register.data );
}

// Show register by filters
const showRegistersForFilters = async ( filters ) => {
  const register = await consulta( api + 'product/' + filters );
  printList( register.data );
}

const showInitModal = async () => {
  await showOptions('ubication', api + 'ubication');
  await showOptions('ubicationSearch', api + 'ubication');
  await showOptions('category', api + 'category');
  await showOptions('categorySearch', api + 'category');
  await showOptions('commission', api + 'commission');
  await showOptions('commissionSearch', api + 'commission');
}

const showTablePagination = async ( page = 1, limit = 10 ) => {
  // const registers = await consulta( api + 'product?page=' + page + '&limit=' + limit );
  const registers = await consulta( api + `product?country=${country}`);
  printList( registers.data );
}
const searchRegister = async ( searchQuery ) => {
  const register = await consulta( api + 'product/search?' + searchQuery );
  printList( register.data );
}
  
formSearch.addEventListener('submit', async(e) => {
  e.preventDefault();
  if ( idSearchInput.value === '' && nameSearchInput.value === '' && categoryInput.value === '' && ubicationInput.value === '' && commissionInput.value === '' ) return await showTablePagination();

  let arrayQuery = [];
  if(idSearchInput.value) arrayQuery.push(`id=${parseInt(idSearchInput.value)}`);
  if(nameSearchInput.value) arrayQuery.push(`name=${nameSearchInput.value}`);
  if(categorySearchInput.value) arrayQuery.push(`category=${parseInt(categoryInput.value)}`);
  if(ubicationSearchInput.value) arrayQuery.push(`ubication=${parseInt(ubicationInput.value)}`);
  if(commisionSearchInput.value) arrayQuery.push(`commission=${parseInt(commissionInput.value)}`);
  
  return await searchRegister( arrayQuery.join('&') );
  
});

async function showModalCreateOrEdit( uid, btnAction = 'CREATE'| 'EDIT'| 'SHOW' ) {
  myModal.show();
  formCreateEditRegister.reset();

  switch (btnAction) {
    case 'CREATE':
      toggleMenu('edit_register', false);
      toggleMenu('save_register', true);
      break;
    case 'EDIT':
      toggleMenu('edit_register', true);
      toggleMenu('save_register', false);
      
      break;
    case 'SHOW':
      toggleMenu('edit_register', false);
      toggleMenu('save_register', false);
      break;
  }
  
  addDisabledOrRemove( btnAction === 'SHOW' ?? false , 'disabled');
  
  const register = await consulta( api + 'product/' + uid );
  const { name, description, category, ubication, quantity, commission, enabled, observations } = register.data;

  idInput.value = uid;
  nameInput.value =  name;
  descriptionInput.value = description ?? '';
  categoryInput.value = category;
  ubicationInput.value = ubication;
  commissionInput.value = commission;
  quantityInput.value = quantity ?? 0;
  observationInput.value = observations ?? '';
  enabledInput.value = enabled;
}

const createEditRegister = async ( data, uid = '') => {
    
  const query = `product${ uid === '' ? '/' : `/${uid}`  }`
  return await fetch( api + query , {
    method: uid === '' ? 'POST' : 'PUT',
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

const sendInfo = async (uid = '', action = 'CREATE'|'EDIT') => {
  nameValidator = validateAllfields(nameInput, divErrorName);
  quantityValidator = validateAllfields(quantityInput, divErrorQuantity, true);
  descriptionValidator = validateAllfields(descriptionInput, divErrorDescription);
  categoryValidator = validateAllfields(categoryInput, divErrorCategory, true);
  ubicationValidator = validateAllfields(ubicationInput, divErrorUbication, true);
  commissionValidator = validateAllfields(commissionInput, divErrorCommission, true);
  
  if (!nameValidator || !quantityValidator || !categoryValidator || !ubicationValidator || !commissionValidator) return console.log('Ingrese Datos faltantes');
  
  const data = {
    name: nameInput.value.toUpperCase(),
    description: descriptionInput.value,
    category: Number(categoryInput.value),
    ubication: Number(ubicationInput.value),
    commission: Number(commissionInput.value),
    quantity: Number(quantityInput.value),
    observations: observationInput.value,
    enabled: enabledInput.value,
    user: userId
  }

  const result = await createEditRegister( data, uid );
  if (!result) return showMessegeAlert( true, 'Error al editar el registro');
  showMessegeAlert( false, action === 'EDIT' ? `Registro Editado` : 'Registro Creado');
  bootstrap.Modal.getInstance(modalRegister).hide();
  document.querySelector(".modal-backdrop").remove();
  await showTablePagination();
}

btnCreateRegister.addEventListener('click', () => {
  clearForm();
  toggleMenu('edit_register', false);
  toggleMenu('save_register', true);
});

document.querySelector(`#save_register`).addEventListener('click', async (e) => {
  e.preventDefault();
  sendInfo('', 'CREATE')
});

document.querySelector(`#edit_register`).addEventListener('click', async (e) => {
  e.preventDefault();
  sendInfo(idInput.value, 'EDIT');
});

modalRegister.addEventListener('show.bs.modal', () => {
  // dateAttentionInput.max = new Date().toISOString().substring(0,10);
  addDisabledOrRemove(false, 'disabled');
  formCreateEditRegister.reset();
});

function addDisabledOrRemove( disabled = true, attribute = 'readonly' ) {
  disabled ? nameInput.setAttribute(attribute, true) : nameInput.removeAttribute(attribute);
  disabled ? descriptionInput.setAttribute(attribute, true) : descriptionInput.removeAttribute(attribute);
  disabled ? categoryInput.setAttribute(attribute, true) : categoryInput.removeAttribute(attribute);
  disabled ? ubicationInput.setAttribute(attribute, true) : ubicationInput.removeAttribute(attribute);
  disabled ? commissionInput.setAttribute(attribute, true) : commissionInput.removeAttribute(attribute);
  disabled ? quantityInput.setAttribute(attribute, true) : quantityInput.removeAttribute(attribute);
  disabled ? observationInput.setAttribute(attribute, true) : observationInput.removeAttribute(attribute);
  disabled ? enabledInput.setAttribute(attribute, true) : enabledInput.removeAttribute(attribute);
}

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
  enabledInput.value = true
  
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
  divErrorObservation.innerHTML = ''
}

window.addEventListener("load", async() => {
    isSession();
    // dateAttentionInputSearch.max = new Date().toISOString().substring(0,10);
    showTitlesTable();
    await showTablePagination();
    await showInitModal();
    const fader = document.getElementById('fader');
    fader.classList.add("close");
    fader.style.display = 'none';
  }
)