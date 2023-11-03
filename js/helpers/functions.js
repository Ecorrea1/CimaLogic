const toggleMenu = ( id, enabled = false) => enabled ? document.getElementById( id ).classList.remove('d-none') : document.getElementById( id ).classList.add("d-none");

const showBadgeBoolean = (enabled = 1) => { 
  const enabledCristal = enabled ? 'ACTIVADO' : 'DESACTIVADO'
  return `<span class="badge text-bg-${ enabledCristal == 'ACTIVADO' ? 'success' : 'danger' }">${ enabledCristal }</span>`
}
function showError( divInput, divError, messageError = '', show = true ) {
  divInput.style.borderColor = show ? '#ff0000' : 'hsl(270, 3%, 87%)'
  divError.innerText = messageError;
}
  
// Funciones verificadores de campos
function verifyIsFilled( input, divError ) {
  divError.style.display = input.value == '' ?  'block' : 'none';
  return input.value == '' ? false : true;
}
function  validateLetters( input ) {
  //Validar que solo sean letras
  const regex = /[A-z]/g;
  return regex.test(input.value) ? true : false;
}
function validateNumber(input) {
  // Validar input que solo sean numeros negativos
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