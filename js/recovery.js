"use strict";
let passValidator = false;

const divErrorName = document.getElementById('divErrorPass');
const alertMessage = document.getElementById('alert-msg');
const btnEditRegister = document.getElementById(`edit_register`);
const formRegister = document.getElementById('createRegister');
const idInput = document.getElementById('uid');
const passInput = document.getElementById('password');
const passInput2 = document.getElementById('password2');
const changePass = async () => {

    if(passInput.value === '' || passInput2.value === '') return showMessegeAlert(alertMessage, 'Ingrese datos por favor', true);
    if(passInput.value != passInput2.value ) return showMessegeAlert(alertMessage, 'Ingrese la contraseña correctamente', true);
    passValidator = (passInput.value.length <= 8) ? true : false;
    divErrorName.innerHTML = passValidator ? '' : 'Contraseña demasiado corta';
    const data = {
      password: passInput.value,
      reset_pass: false,
      user: userId
    }

    const result = await actionWithData( data, userId, 'user' );
    if (!result) return showMessegeAlert( alertMessage, 'Error al editar el registro', true);
    showMessegeAlert( alertMessage, `Registro Editado`);
    localStorage.setItem("reset", JSON.stringify(false)); 
    location.replace( url + '/index.html');
}

btnEditRegister.addEventListener('click', async () => await changePass());

window.addEventListener("load", () => {
    formRegister.reset();
});