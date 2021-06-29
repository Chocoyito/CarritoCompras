"use strict";
// Variables
const marca = document.querySelector(`#marca`);
const year = document.querySelector(`#year`);
const precioMinimo = document.querySelector(`#minimo`);
const precioMaximo = document.querySelector(`#maximo`);
const puertas = document.querySelector(`#puertas`);
const transmision = document.querySelector(`#transmision`);
const color = document.querySelector(`#color`);
// Contenedor para los resultados
const resultado = document.querySelector(`#resultado`);
const maximo = new Date().getFullYear();
let otraVerificacion = maximo % 100;
otraVerificacion = Math.ceil(otraVerificacion / 2); // Para que siga presentando los anios hasta 2010 sin importar la fecha.
const minimo = maximo - otraVerificacion;
class Carro {
}
// Generar un objeto con la busqueda.
const datosBusqueda = new Carro();
// Eventos
document.addEventListener(`DOMContentLoaded`, () => {
    mostrarAutos(autos); // Muestras los automoviles al cargar.
    llenarSelect(); // Llena las opciones de anio.    
});
// Eventos para los selects
cargarEventListeners();
function cargarEventListeners() {
    marca.addEventListener(`change`, obtenerMarcaCarro);
    year.addEventListener(`change`, obtenerAnioCarro);
    precioMinimo.addEventListener(`change`, obtenerPrecioMinimo);
    precioMaximo.addEventListener(`change`, obtenerPrecioMaximo);
    puertas.addEventListener(`change`, obtenerPuertasCarro);
    transmision.addEventListener(`change`, obtenerTransmisionCarro);
    color.addEventListener(`change`, obtenerColorCarro);
}
function obtenerMarcaCarro(event) {
    datosBusqueda.marca = event.target.value;
    filtrarAuto();
}
function obtenerAnioCarro(event) {
    datosBusqueda.year = event.target.value;
    filtrarAuto();
}
function obtenerPrecioMinimo(event) {
    datosBusqueda.precioMinimo = event.target.value;
    filtrarAuto();
}
function obtenerPrecioMaximo(event) {
    datosBusqueda.precioMaximo = event.target.value;
    filtrarAuto();
}
function obtenerPuertasCarro(event) {
    datosBusqueda.puertas = event.target.value;
    filtrarAuto();
}
function obtenerTransmisionCarro(event) {
    datosBusqueda.transmision = event.target.value;
    filtrarAuto();
}
function obtenerColorCarro(event) {
    datosBusqueda.color = event.target.value;
    filtrarAuto();
    console.log(datosBusqueda);
}
function mostrarAutos(autos) {
    // Elimina el HTML previo.
    limpiarHTML();
    autos.forEach((auto) => {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML = document.createElement(`p`);
        autoHTML.textContent =
            `
        ${marca} ${modelo} ${year} - ${puertas} PUERTAS - TRANSMISION: ${transmision} - PRECIO: ${precio} - COLOR: ${color}    
        `;
        // Insertar en el HTML
        resultado.appendChild(autoHTML);
    });
}
function limpiarHTML() {
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild);
    }
}
function llenarSelect() {
    for (let i = maximo; i >= minimo; i--) {
        const opcion = document.createElement(`option`);
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); // Agrega las opciones de anio al select.
    }
}
// Funcion que filtra en base a la busqueda
function filtrarAuto() {
    // Funcion de alto nivel. Una funcion que toma a otra funcion.
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    // console.log(resultado);
    if (resultado.length)
        mostrarAutos(resultado);
    else
        noHayResultados();
}
function noHayResultados() {
    limpiarHTML();
    const noResultados = document.createElement(`div`);
    noResultados.classList.add(`alerta`, `error`);
    noResultados.textContent = `No hay resultados, intenta con otros parametros de busqueda.`;
    resultado.appendChild(noResultados);
}
function filtrarMarca(auto) {
    const { marca } = datosBusqueda;
    if (marca) // Si marca tiene algo.
        return auto.marca === marca; // Filtrando la marca del automovil.
    else
        return auto; // Trayendo todos los automoviles de regreso.
}
function filtrarYear(auto) {
    const { year } = datosBusqueda;
    if (year)
        return auto.year === parseInt(year);
    else
        return auto;
}
function filtrarMinimo(auto) {
    const { precioMinimo } = datosBusqueda;
    if (precioMinimo)
        return auto.precio >= parseInt(precioMinimo);
    else
        return auto;
}
function filtrarMaximo(auto) {
    const { precioMaximo } = datosBusqueda;
    if (precioMaximo)
        return auto.precio <= parseInt(precioMaximo);
    else
        return auto;
}
function filtrarPuertas(auto) {
    const { puertas } = datosBusqueda;
    if (puertas)
        return auto.puertas === parseInt(puertas);
    else
        return auto;
}
function filtrarTransmision(auto) {
    const { transmision } = datosBusqueda;
    if (transmision)
        return auto.transmision === transmision;
    else
        return auto;
}
function filtrarColor(auto) {
    const { color } = datosBusqueda;
    if (color)
        return auto.color === color;
    else
        return auto;
}
