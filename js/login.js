"use strict";
let emailValidator = false;
let passValidator = false;

const form = document.getElementById('form-sesion');
const inputEmail = document.getElementById('input-email');
const inputPass = document.getElementById('input-pass');

const labelErrorEmail = document.getElementById('divErrorEmail');
const labelErrorPass = document.getElementById('divErrorPass');

const checkRememberMe = document.getElementById('remember-me');
const btnAccess = document.getElementById('btn-access');

function showAlert(message) {
  const element = document.getElementById("alerts");
  element.classList.remove("d-none");
  element.innerHTML = message;
}
function clearForm(){
  inputEmail.value= "";
  inputPass.value="";
}

const sendSession = async ( data) => {  
  return await fetch( api + 'auth' , {
    method: 'POST',
    headers: { 'Content-Type': 'application/json'},
    body: JSON.stringify(data)
  })
  .then((data)=> data.json())
  .then(response => {
      const { id, email, name, country_id, role } = response.data;    
      // localStorage.setItem("token", response.token);
      localStorage.setItem("email", email);
      localStorage.setItem("name", name);
      localStorage.setItem("role", role);
      localStorage.setItem("country", country_id);
      localStorage.setItem("uid", id);
      return true;
    }
  )
  .catch(err => {
     console.error(err);
    return false;
  });
}

async function sendInfo(){
  emailValidator = validateAllfields(inputEmail, labelErrorEmail);
  passValidator = validateAllfields(inputPass, labelErrorPass);
  
  const data = ({
    "email": inputEmail.value,
    "password": inputPass.value
  });
  
  const result =  await sendSession(data)
  if(!result) return showAlert('Hay problemas para iniciar sesion');
  showAlert('iniciando sistemas');
  location.replace( url + '/index.html');
}

btnAccess.addEventListener('click', async (e) => {
  e.preventDefault();
  if(inputEmail.value === '' || inputPass.value === '') return inputEmail.value = 'Ingresa algo'
  //Validación de correo electrónico
  // let regexEmail = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  // emailValidator = (regexEmail.test(inputEmail.value)) ? true : false;
  // labelErrorEmail.innerHTML =  emailValidator ? '' : 'Correo inválido';

  //Validación de contraseña
  // passValidator = (inputPass.value.length >= 8) ? true : false;
  // labelErrorPass.innerHTML = passValidator ? '' : 'Contraseña demasiado corta';
  await sendInfo();
})

//Verificar si el usuario ya ha iniciado sesión

window.addEventListener("load", async() => {
  const userLogged = localStorage.getItem('email');
  if(userLogged) return window.location.href = `${url}/index.html`
  clearForm()
})