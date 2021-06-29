"use strict";

// Variables
const carrito: Element | any = document.querySelector(`#carrito`);
const contenedorCarrito: Element | any = document.querySelector(`#lista-carrito tbody`);
const limpiarCarrito: Element | any = document.querySelector(`#vaciar-carrito`);
const listaCursos: Element | any = document.querySelector(`#lista-cursos`);
let articulosCarrito: any[] = [];

cargarEventListeners();
function cargarEventListeners(): void
{
    // Cuando agregas un curso presionando "agregar al carrito".
    listaCursos.addEventListener(`click`, agregarCurso);

    // Elimina cursos del carrito.
    carrito.addEventListener(`click`, eliminarCurso);

    // Vaciar todo el carro
    limpiarCarrito.addEventListener(`click`, () =>  // Para funciones cortas como estas, mejor crearlas anonimas.
    {
        articulosCarrito = []; // Reiniciamos el arreglo.
        limpiarHTML(); // Eliminamos todo el HTML.
    });
}

// Funciones.
function agregarCurso(event: any): void
{
    event.preventDefault();

    if (event.target.classList.contains(`agregar-carrito`))
    {
        const cursoSeleccionado: any = event.target.parentElement.parentElement;
        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina un curso del carrito.
function eliminarCurso(event: any): void
{
    // console.log(e.target.classList);
    if (event.target.classList.contains(`borrar-curso`))
    {
        const cursoId: any = event.target.getAttribute(`data-id`);

        // Elimina del arreglo articulosCarrito por el data-id.
        articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);
        carritoHTML(); // Iterar sobre el carrito y mostrar su HTML.
    }
}

// Lee el contenido del HTML al que le dimos clic y extrae la informacion del curso.
function leerDatosCurso(cursoSeleccionado: any): void
{
    // console.log(cursoSeleccionado);

    // Creando un objeto con el contenido del curso actual.
    const infoCurso =
    {
        imagen: cursoSeleccionado.querySelector(`img`).src,
        titulo: cursoSeleccionado.querySelector(`h4`).textContent,
        precio: cursoSeleccionado.querySelector(`.precio span`).textContent,
        id: cursoSeleccionado.querySelector(`a`).getAttribute(`data-id`),
        cantidad: 1,
    }

    // Revisa si un elemento ya existe en el carrito.
    const existe: boolean = articulosCarrito.some(curso => curso.id === infoCurso.id);
    if (existe)
    {
        // Actualizamos la cantidad.
        const cursos: any[] = articulosCarrito.map(curso => 
        {
            if (curso.id === infoCurso.id)
            {
                curso.cantidad++;
                return curso; // Retorna el objeto actualizado
            }
            else
            {
                return curso; // Retorna los objetos que no son duplicados.
            }
        });
        articulosCarrito = [...cursos];
    }
    else
    {
        // Agregear elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    // console.log(articulosCarrito);

    carritoHTML();
}

// Muestra el carrito de compras en el HTML.

function carritoHTML(): void
{
    // Limpiar el HTML.
    limpiarHTML();
    
    // Recorre el carrito y general el HTML.
    articulosCarrito.forEach(carritoCursos =>
    {
        // Destructure.
        const { imagen, titulo, precio, cantidad, id } = carritoCursos;

        const row : HTMLTableRowElement = document.createElement(`tr`);
        row.innerHTML = 
        `
            <td>
                <img src="${ imagen }" width="110px">
            </td>
            <td>
                ${ titulo }
            </td>
            <td>
                ${ precio }
            </td>
            <td>
                ${ cantidad }
            </td>
            <td>
                <a href="#" class="borrar-curso" data-id="${ id }"> X </a>
            </td>
        `;
        // Agregar el HTML del carrito en el tbody.
        contenedorCarrito.appendChild(row);
    });
}

// Eliminar los cursos del tbody.
function limpiarHTML(): void
{
    // Forma lenta.
    // contenedorCarrito.innerHTML = null;

    // Forma rapida y eficiente.
    while (contenedorCarrito.firstChild) 
    {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}