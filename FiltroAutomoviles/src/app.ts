// Variables
const marca: Element | any = document.querySelector(`#marca`);
const year: Element | any = document.querySelector(`#year`);
const precioMinimo: Element | any = document.querySelector(`#minimo`);
const precioMaximo: Element | any = document.querySelector(`#maximo`);
const puertas: Element | any = document.querySelector(`#puertas`);
const transmision: Element | any = document.querySelector(`#transmision`);
const color: Element | any = document.querySelector(`#color`);

// Contenedor para los resultados
const resultado: Element | any = document.querySelector(`#resultado`);

const maximo: number = new Date().getFullYear();
let otraVerificacion: number = maximo % 100;
otraVerificacion = Math.ceil(otraVerificacion / 2); // Para que siga presentando los anios hasta 2010 sin importar la fecha.
const minimo: number = maximo - otraVerificacion;

class Carro
{
    marca!: string;
    year!: string;
    precioMinimo!: string;
    precioMaximo!: string;
    puertas!: string;
    transmision!: string;
    color!: string;
}
// Generar un objeto con la busqueda.
const datosBusqueda: Carro = new Carro();

// Eventos
document.addEventListener(`DOMContentLoaded`, () =>
{
    mostrarAutos(autos); // Muestras los automoviles al cargar.
    llenarSelect(); // Llena las opciones de anio.    
});

// Eventos para los selects
cargarEventListeners();
function cargarEventListeners(): void
{
    marca.addEventListener(`change`, obtenerMarcaCarro);
    year.addEventListener(`change`, obtenerAnioCarro);
    precioMinimo.addEventListener(`change`, obtenerPrecioMinimo);
    precioMaximo.addEventListener(`change`, obtenerPrecioMaximo);
    puertas.addEventListener(`change`, obtenerPuertasCarro);
    transmision.addEventListener(`change`, obtenerTransmisionCarro);
    color.addEventListener(`change`, obtenerColorCarro);
}

function obtenerMarcaCarro(event: any): void
{
    datosBusqueda.marca = event.target.value;
    filtrarAuto();
}
function obtenerAnioCarro(event: any): void
{
    datosBusqueda.year = event.target.value;
    filtrarAuto();
}
function obtenerPrecioMinimo(event: any): void
{
    datosBusqueda.precioMinimo = event.target.value;
    filtrarAuto();
}
function obtenerPrecioMaximo(event: any): void
{
    datosBusqueda.precioMaximo = event.target.value;
    filtrarAuto();
}
function obtenerPuertasCarro(event: any): void
{
    datosBusqueda.puertas = event.target.value;
    filtrarAuto();
}
function obtenerTransmisionCarro(event: any): void
{
    datosBusqueda.transmision = event.target.value;
    filtrarAuto();
}
function obtenerColorCarro(event: any): void
{
    datosBusqueda.color = event.target.value;
    filtrarAuto();
    console.log(datosBusqueda);
}

function mostrarAutos(autos: any): void
{
    // Elimina el HTML previo.
    limpiarHTML();

    autos.forEach((auto: { marca: string; modelo: string; year: number; puertas: number; transmision: string; precio: number; color: string; }) => 
    {
        const { marca, modelo, year, puertas, transmision, precio, color } = auto;
        const autoHTML: HTMLParagraphElement = document.createElement(`p`);

        autoHTML.textContent =
        `
        ${ marca } ${ modelo } ${ year } - ${ puertas } PUERTAS - TRANSMISION: ${ transmision } - PRECIO: ${ precio } - COLOR: ${ color }    
        `;
        
        // Insertar en el HTML
        resultado.appendChild(autoHTML);
    });
}
function limpiarHTML(): void
{
    while(resultado.firstChild)
    {
        resultado.removeChild(resultado.firstChild);
    }
}
function llenarSelect(): void
{
    for (let i: number = maximo; i >= minimo; i--) 
    {
        const opcion: HTMLOptionElement | any = document.createElement(`option`);
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion);   // Agrega las opciones de anio al select.
    }
}

// Funcion que filtra en base a la busqueda
function filtrarAuto(): void
{
    // Funcion de alto nivel. Una funcion que toma a otra funcion.
    const resultado: object[] = autos.filter(filtrarMarca).filter( filtrarYear).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor);
    // console.log(resultado);
    if (resultado.length)
        mostrarAutos(resultado);
    else
        noHayResultados();
}
function noHayResultados(): void
{
    limpiarHTML();

    const noResultados: HTMLDivElement = document.createElement(`div`);
    noResultados.classList.add(`alerta`, `error`);
    noResultados.textContent = `No hay resultados, intenta con otros parametros de busqueda.`;
    resultado.appendChild(noResultados);
}
function filtrarMarca(auto: any)
{
    const { marca } = datosBusqueda;

    if (marca) // Si marca tiene algo.
        return auto.marca === marca; // Filtrando la marca del automovil.
    else
        return auto; // Trayendo todos los automoviles de regreso.
}
function filtrarYear(auto: any)
{
    const { year } = datosBusqueda;
    
    if (year)
        return auto.year === parseInt(year);
    else
        return auto;
}
function filtrarMinimo(auto: any)
{
    const { precioMinimo } = datosBusqueda;
    
    if (precioMinimo)
        return auto.precio >= parseInt(precioMinimo);
    else
        return auto;
}
function filtrarMaximo(auto: any)
{
    const { precioMaximo } = datosBusqueda;
    
    if (precioMaximo)
        return auto.precio <= parseInt(precioMaximo);
    else
        return auto;
}
function filtrarPuertas(auto: any)
{
    const { puertas } = datosBusqueda;

    if (puertas)
        return auto.puertas === parseInt(puertas);
    else
        return auto;
}
function filtrarTransmision(auto: any)
{
    const { transmision } = datosBusqueda;

    if (transmision)
        return auto.transmision === transmision;
    else
        return auto;
}
function filtrarColor(auto: any)
{
    const { color } = datosBusqueda;

    if (color)
        return auto.color === color;
    else
        return auto;
}
