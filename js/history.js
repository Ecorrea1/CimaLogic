"use strict";

let nameValidator = false;
let descriptionValidator = false;

const divErrorName = document.getElementById('divErrorName');
const divErrorDescription = document.getElementById('divErrorDescription');
const divErrorEnabled = document.getElementById('divErrorEnabled');

// Show Alert
const alertMessage = document.getElementById('alert-msg');

const btnNewRegister =document.getElementById('btn_create_register');
const btnEditRegisterAction =document.getElementById('btnEditRegister');

// const myModal = new bootstrap.Modal('#myModal', { keyboard: false });
// const modalRegister = document.getElementById('myModal');
const btnCreateRegister = document.getElementById(`save_register`);
const btnEditRegister = document.getElementById(`edit_register`);
const btnExportTableToExcel = document.getElementById('export_excel');


// Show table 
const titlesTable = [ 'ID', 'Usuario', 'Ejecucion', 'Descripcion', 'Acciones'];
const tableTitles = document.getElementById('list_titles');
const trTitles = document.getElementById('list_titles_tr');
const table = document.getElementById('list_row');

const formRegister = document.getElementById('createRegister');
const idInput = document.getElementById('uid');
const nameInput = document.getElementById('name');
const descriptionInput = document.getElementById('description');
const enabledInput = document.getElementById('enabled');

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
  
async function paginado( paginas, limit = 10){
  const totalPages =  paginas > 32 ? 32 : paginas
  for (let index = 0; index < totalPages; index++ ) document.getElementById("indice").innerHTML+= `<li class="page-item"><button class="page-link" onclick="printList(${ index * limit })">${ index + 1}</button></li>`;
}
    
const printList = async ( data, limit = 10 ) => {
  table.innerHTML = "";
  if( data.length === 0 || !data ) {
    showMessegeAlert( false, 'No se encontraron registros' );
    return table.innerHTML = `<tr><td colspan="${ titlesTable.length + 1 }" class="text-center">No hay registros</td></tr>`;
  }

  for (const i in data ) {
    const { id, user, action, description } = data[i];
    const actions = [
      `<button type="button" id='btnEditRegister' onClick='showModalCreateOrEdit(${ id })' value=${ id } class="btn btn-success">VER</button>`,
    ]
    const rowClass  = 'text-right';
    const customRow = `<td>${ [ id, user, action, description, actions ].join('</td><td>') }</td>`;
    const row       = `<tr class="${ rowClass }">${ customRow }</tr>`;
    table.innerHTML += row;
  }
  // paginado( Math.ceil( data.length / limit ) );
}

// Show all registers in the table
const showRegisters = async () => {
  const registers = await consulta( api + 'history');
  printList( registers.data );
}

async function showModalCreateOrEdit( uid ) {
    myModal.show();
    formRegister.reset();
  
    const register = await consulta( api + 'history/' + uid );
    toggleMenu('edit_register', false);
    toggleMenu('save_register', false);
    
    const { user, action, description } = register.data;
  
    idInput.value = uid;
    nameInput.value =  name;
    descriptionInput.value = description;
    enabledInput.value = enabled;
}

  function showMessegeAlert ( isErro = false, message, time = 3000 ) {
    if (isErro) {
      alert.classList.add('alert-danger');
      alert.classList.remove('alert-success');
    } else {
      alert.classList.add('alert-success');
      alert.classList.remove('alert-danger');
    }
    alert.textContent = message;
    alert.style.display = 'block';
    setTimeout(() => {
      alert.style.display = 'none';
    }, time);
  }
  
  function showError( divInput, divError, messageError = '', show = true ) {
    if (show){
      divError.innerText = messageError;
      divInput.style.borderColor = '#ff0000';
    } else {
      divError.innerText = messageError;
      divInput.style.borderColor = 'hsl(270, 3%, 87%)';
    }
  }

//Funciones de muestra de mensajes de alerta
function showMessegeAlert ( isErro = false, message, time = 3000 ) {
    if (isErro) {
      alertMessage.classList.add('alert-danger');
      alertMessage.classList.remove('alert-success');
    } else {
      alertMessage.classList.add('alert-success');
      alertMessage.classList.remove('alert-danger');
    }
    alertMessage.textContent = message;
    alertMessage.style.display = 'block';
    setTimeout(() => {
      alertMessage.style.display = 'none';
    }, time);
  }
  
  function showError( divInput, divError, messageError = '', show = true ) {
    if (show){
      divError.innerText = messageError;
      divInput.style.borderColor = '#ff0000';
    } else {
      divError.innerText = messageError;
      divInput.style.borderColor = 'hsl(270, 3%, 87%)';
    }
  }

function clearForm() {
  idInput.value = '';
  nameInput.value = '';
  descriptionInput.value = '';
  enabledInput.value = 1;
}

function exportTableToExcel(tableID, filename = ''){
  var downloadLink;
  var dataType = 'application/vnd.ms-excel';
  var tableSelect = document.getElementById(tableID);
  var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  
  // Specify file name
  filename = filename?filename+'.xls':'excel_data.xls';
  
  // Create download link element
  downloadLink = document.createElement("a");
  
  document.body.appendChild(downloadLink);
  
  if(navigator.msSaveOrOpenBlob){
      var blob = new Blob(['ufeff', tableHTML], {
          type: dataType
      });
      navigator.msSaveOrOpenBlob( blob, filename);
  }else{
      // Create a link to the file
      downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
  
      // Setting the file name
      downloadLink.download = filename;
      
      //triggering the function
      downloadLink.click();
  }
}

btnExportTableToExcel.addEventListener('click', () => exportTableToExcel('table_registros','registros-optica.csv'));

// Al abrir la pagina
window.addEventListener("load", async() => {
    showTitlesTable();
    await showRegisters();
    const fader = document.getElementById('fader');
    fader.classList.add("close");
    fader.style.display = 'none';
  }
)