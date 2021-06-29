"use strict";
// Variables.
const botonEnviar = document.querySelector(`#enviar`);
const botonReiniciar = document.querySelector(`#resetBtn`);
const formulario = document.querySelector(`#enviar-mail`);
// Variables para campos
const paraCorreo = document.querySelector(`#email`);
const asunto = document.querySelector(`#asunto`);
const mensaje = document.querySelector(`#mensaje`);
// https://www.emailregex.com/ Expresiones regulares para correos.
const expresionRegular = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
eventListeners();
function eventListeners() {
    // Cuando la aplicacion arranca.
    document.addEventListener(`DOMContentLoaded`, iniciarAplicacion);
    // Campos del formulario.
    paraCorreo.addEventListener(`blur`, validarFormulario);
    asunto.addEventListener(`blur`, validarFormulario);
    mensaje.addEventListener(`blur`, validarFormulario);
    // Reinicia el formulario.
    botonReiniciar.addEventListener(`click`, reiniciarFormulario);
    // Enviar correo.
    formulario.addEventListener(`submit`, enviarCorreo);
}
// Funciones.
function iniciarAplicacion() {
    botonEnviar.disabled = true;
    botonEnviar.classList.add(`cursor-not-allowed`, `opacity-50`);
}
function validarFormulario(event) {
    console.log(event.target.value); // Imprime lo que el usuario escribe cuando sale.
    if (event.target.value.length > 0) {
        // Elimina los errores
        const error = document.querySelector(`p.error`);
        if (error)
            error.remove();
        event.target.classList.remove(`border`, `border-red-500`);
        event.target.classList.add(`border`, `border-green-500`);
        // console.log(`Si hay algo`);
    }
    else {
        event.target.classList.remove(`border`, `border-green-500`);
        event.target.classList.add(`border`, `border-red-500`);
        mostrarError(`Todos los campos son obligatorios`);
    }
    // IndexOf revisa si existe un carecter en la cadena. Si retorna menor que 0 no existe, caso contrario mostrara la posicion del caracter en la cadena si fue encontrado.
    if (event.target.type === `email`) {
        // const resultado = evento.target.value.indexOf(`@`);
        if (expresionRegular.test(event.target.value)) {
            // console.log(`El correo es valido`);
            const error = document.querySelector(`p.error`);
            if (error)
                error.remove();
            event.target.classList.remove(`border`, `border-red-500`);
            event.target.classList.add(`border`, `border-green-500`);
        }
        else {
            event.target.classList.remove(`border`, `border-green-500`);
            event.target.classList.add(`border`, `border-red-500`);
            mostrarError(`Correo no valido`);
        }
    }
    if (expresionRegular.test(paraCorreo.value) && asunto.value !== `` && mensaje.value !== ``) {
        botonEnviar.disabled = false;
        botonEnviar.classList.remove(`cursor-not-allowed`, `opacity-50`);
    }
}
function mostrarError(mensaje) {
    const mensajeError = document.createElement(`p`);
    mensajeError.textContent = mensaje;
    mensajeError.classList.add(`border`, `border-red-500`, `background-red-100`, `text-red-500`, `p-3`, `mt-5`, `text-center`, `error`);
    const errores = document.querySelectorAll(`.error`);
    if (errores.length === 0)
        formulario.appendChild(mensajeError);
}
function enviarCorreo(event) {
    event.preventDefault();
    // Mostrar el spinner
    const spinner = document.querySelector(`#spinner`);
    spinner.style.display = `flex`;
    // Despues de 3 segundos ocultar el spinner y mostrar el mensaje.
    setTimeout(() => {
        // Desaparicion del spinner luego de 3 segundos.
        spinner.style.display = `none`;
        // Mensaje que dira que se envio correctamente.
        const parrafo = document.createElement(`p`);
        parrafo.textContent = `El mensaje se envio correctamente.`;
        parrafo.classList.add(`text-center`, `my-10`, `p-2`, `bg-green-500`, `text-white`, `font-bold`, `uppercase`);
        // Inserta el parrafo antes del spinner.
        formulario.insertBefore(parrafo, spinner);
        setTimeout(() => {
            parrafo.remove(); // Eliminara el mensaje de envio exitoso.
            reiniciarFormulario();
        }, 5000);
    }, 3000);
    // Cada 1000 es un segundo. (3000 = 3 segundos).
}
function reiniciarFormulario() {
    formulario.reset(); // Metodo "reset" reinicia el formulario.
    iniciarAplicacion();
}
