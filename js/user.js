"use strict";
let nameValidator = false;
let descriptionValidator = false;
let enabledValidator = false;

const divErrorName = document.getElementById('divErrorName');
const divErrorDescription = document.getElementById('divErrorDescription');
const divErrorEnabled = document.getElementById('divErrorEnabled');

// Show Alert
const alertMessage = document.getElementById('alert-msg');

const btnCreateRegister = document.getElementById(`save_register`);
const btnEditRegister = document.getElementById(`edit_register`);

const formRegister = document.getElementById('createRegister');
const idInput = document.getElementById('uid');
const nameInput = document.getElementById('name');
const addressInput = document.getElementById('address');
const emailInput = document.getElementById('email');
const codeInput = document.getElementById('code');
const phoneInput = document.getElementById('phone');
const nationalityInput = document.getElementById('nationality');
const roleInput = document.getElementById('rol');
    

// Show all registers in the table
const showData = async () => {
  const data = await consulta( api + `user/${ userId }`);   
  localStorage.setItem( 'user', JSON.stringify(data[0]) ); 
  showModalCreateOrEdit();
}

const sendInfo = async (uid = '') => {
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
    user: userId
  }
  
  const result = await actionWithData( data, uid, 'user' );
  if (!result) return showMessegeAlert( alertMessage, 'Error al editar el registro', true);
  await showData();
  localStorage.setItem("reset", JSON.stringify(false)); 
  showMessegeAlert( alertMessage, `Registro Editado`);
}

async function showModalCreateOrEdit() {
  const data = JSON.parse(localStorage.getItem( 'user' ));
  const { id, name, email, role, address, country_id, code, phone } = data;
  
  localStorage.setItem("email", email);
  localStorage.setItem("name", name);
  localStorage.setItem("role", role);
  localStorage.setItem("country", country_id);

  idInput.value = id;
  nameInput.value =  name;
  addressInput.value = address;
  emailInput.value =  email;
  codeInput.value = code;
  phoneInput.value = phone;
  roleInput.value = role;
  nationalityInput.value = country_id
}
function clearForm() {
  formRegister.reset();
}

btnEditRegister.addEventListener('click', async (e) => await sendInfo(idInput.value, 'EDIT'));
const showOptionsCode = async ( select, endpoint = 'country') => {
  const selectElement = document.getElementById( select );
  selectElement.value = "";
  let options = JSON.parse(localStorage.getItem( select )) || [];
  
  if (!options.length) {
    const result = await consulta( api + endpoint );
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

window.addEventListener("load", async () => {
  await showOptions('rol', api + `role`);
  await showOptions('nationality', api + `country`);
  await showOptionsCode('code');
  await showModalCreateOrEdit()
});