const token = localStorage.getItem("token");
const email = localStorage.getItem('email');
const user = localStorage.getItem('name');
const userId = Number(localStorage.getItem('uid'));
const role = Number(localStorage.getItem('role'));
const country = Number(localStorage.getItem('country'));
const commission = localStorage.getItem('commission');
const category = localStorage.getItem('category');
const ubication = localStorage.getItem('ubication');
const product = localStorage.getItem('product');

const toggleMenu = ( id, enabled = false) => enabled ? document.getElementById( id ).classList.remove('d-none') : document.getElementById( id ).classList.add("d-none");

const showBadgeBoolean = (enabled = 1) => { 
  const enabledBadge = enabled ? 'ACTIVADO' : 'DESACTIVADO'
  return `<span class="badge text-bg-${ enabledBadge === 'ACTIVADO' ? 'success' : 'danger' }">${ enabledBadge }</span>`
}


// Show options in select 
const showOptions = async (select, query) => {
  const selectElement = document.getElementById(select);
  selectElement.value = "";
  // let options = JSON.parse(localStorage.getItem(select)) || [];
  
  // if (!options.length) {
    const result = await consulta(query);
    let options = result.data;
    // localStorage.setItem(select, JSON.stringify(options));
  // }
  // Iteramos sobre el array de opciones
  options.forEach(option => {
    const { id, name } = option;
    const optionElement = `<option value="${id}">${name}</option>`;
    selectElement.innerHTML += optionElement;
  });
};

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
  divInput.style.borderColor = show ? '#ff0000' : 'hsl(270, 3%, 87%)'
  divError.innerText = messageError;
}
function verifyIsFilled( input, divError ) {
  divError.style.display = input.value == '' ?  'block' : 'none';
  return input.value == '' ? false : true;
}
function  validateLetters( input ) {
  const regex = /[A-z]/g;
  return regex.test(input.value) ? true : false;
}
function validateNumber(input) {
  const regex = /^[0-9]*$/;
  return regex.test(input.value) ? true : false;
}
  
function validateAllfields( divInput, divError, fieldNumber = false ) {
  if(verifyIsFilled(divInput, divError)){
    if (fieldNumber) {
      if (validateNumber(divInput)) {
        showError(divInput, divError, '', false);
        return true;
      } 
      showError(divInput, divError, 'Solo se permiten numeros', true);
      return false;
    } else {
      if(validateLetters(divInput)) {
        showError(divInput, divError, '', false);
        return true;
      }
      showError(divInput, divError, 'Solo se permiten letras', true);
      return false;
    }
  } else {
    showError(divInput, divError, 'Este campo es obligatorio');
    return false;
  }
}
const showTitlesTable = () => {
  let titles = '';
  for (const i in titlesTable ) titles += `<th>${ titlesTable[i] }</th>`;
  tableTitles.innerHTML = `<tr>${ titles }</tr>`;
}

async function consulta( url ) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
}

function exportTableToExcel(tableID, filename = ''){
  let downloadLink;
  const dataType = 'application/vnd.ms-excel';
  const tableSelect = document.getElementById(tableID);
  const tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');
  
  // Specify file name
  filename = filename ? filename + '.xls' : 'excel_data.xls';
  // Create download link element
  downloadLink = document.createElement("a");
  document.body.appendChild(document.createElement("a"));
  
  if(navigator.msSaveOrOpenBlob){
    const blob = new Blob(['ufeff', tableHTML], { type: dataType });
    navigator.msSaveOrOpenBlob( blob, filename);
  } else {
    // Create a link to the file
    downloadLink.href = 'data:' + dataType + ', ' + tableHTML;
    // Setting the file name
    downloadLink.download = filename;
    //triggering the function
    downloadLink.click();
  }
}

function exportTableToPDF(tableID,  filename = 'registrosEnPdf' ) {
  const doc = new jsPDF('p', 'mm', 'a4'); // A4 page in portrait mode
  doc.autoTable({
     html: document.getElementById(tableID),
     startY: 20,
     theme: 'grid', // Optional, uses grid theme if not defined
     styles: {
       fontSize: 9,
       overflow: 'linebreak',
       columnWidth: 'wrap'
     },
     headerStyles: {
       fillColor: [231, 76, 60],
       fontSize: 12
     },
     bodyStyles: {
       fillColor: [255, 255, 255],
       strokeColor: [0, 0, 0],
       fontSize: 10
     },
     alternateRowStyles: {
       fillColor: [245, 245, 245]
     }
  });
 
  doc.save(`${filename}.pdf`); // Save the PDF with a filename
 }

function closeSession() {
  localStorage.clear();
  noLogin();
}

function isSession(){
  if (!email && url !== `${url}/login.html`) return window.location.href = `${url}/login.html`;
}

function noLogin() {
  let urlok = location.href.replace(url, "");
  (localStorage.getItem("token") === null && urlok !==`${url}/login.html`) 
  ?   location.replace(`${url}/login.html`)
  :   console.log("LOGEADO");
}