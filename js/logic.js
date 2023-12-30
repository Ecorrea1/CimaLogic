const welcomeUser = document.getElementById('hello-user');
const message = document.getElementById('message-welcome');
const userNameInput = user;

const hiUser = () => {

    welcomeUser.textContent = `Hola, ${ userNameInput }!`;
    message.textContent = `Bienvenido a la plataforma de MOVIDA`

}

window.addEventListener("load", () => {
    isSession();
    hiUser();
  }
)