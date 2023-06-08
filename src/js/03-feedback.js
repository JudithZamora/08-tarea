import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');
const storageKey = 'feedback-form-state';

// Guardar el estado del formulario
const saveFormState = throttle(() => {
  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };
  localStorage.setItem(storageKey, JSON.stringify(formState));
}, 500);

// Llenar los campos con los datos en local
const fillFormFields = () => {
  const savedState = localStorage.getItem(storageKey);
  if (savedState) {
    const formState = JSON.parse(savedState);
    emailInput.value = formState.email;
    messageInput.value = formState.message;
  }
};

//  Guardar el estado del formulario en el almacenamiento local
form.addEventListener('input', saveFormState);

// Llenar los campos del formulario con los datos guardados al cargar la página
window.addEventListener('load', fillFormFields);

// Borrar el almacenamiento y los campos del formulario y mostrar los valores actuales en la consola
form.addEventListener('submit', e => {
  e.preventDefault();

  const formState = {
    email: emailInput.value,
    message: messageInput.value,
  };

  localStorage.removeItem(storageKey);
  emailInput.value = '';
  messageInput.value = '';

  console.log(formState);
});

