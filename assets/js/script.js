let listaNombresGastos = [];
let listaValoresGasto = [];
let listaDescripcionesGastos = [];
let gastoEnEdicion = null; // Variable para guardar el índice del gasto en edición
const limiteGastos = 150; // Define el límite de gastos en dólares

// Esta función se invoca al momento de que el usuario hace click en el botón
function clickBoton() {
    let nombreGasto = document.getElementById('nombreGasto').value;
    let valorGasto = parseFloat(document.getElementById('valorGasto').value);
    let descripcionGasto = document.getElementById('descripcionGasto').value;

    // Verifica si el valorGasto es un número válido
    if (isNaN(valorGasto)) {
        alert("Por favor, ingresa un valor numérico válido para el gasto.");
        return;
    }

    if (gastoEnEdicion === null) {
        agregarGasto(nombreGasto, valorGasto, descripcionGasto);
    } else {
        actualizarGasto(nombreGasto, valorGasto, descripcionGasto);
    }
}

function agregarGasto(nombreGasto, valorGasto, descripcionGasto) {
    // Calcula el total actual de los gastos
    let totalGastosActual = listaValoresGasto.reduce((acc, curr) => acc + parseFloat(curr), 0);
    // Calcula el nuevo total de gastos con el nuevo gasto
    let nuevoTotalGastos = totalGastosActual + valorGasto;

    // Verifica si el nuevo total supera el límite de gastos
    if (nuevoTotalGastos > limiteGastos) {
        alert("¡Has superado el límite de gastos permitido de $150!");
        return;
    }

    listaNombresGastos.push(nombreGasto);
    listaValoresGasto.push(valorGasto);
    listaDescripcionesGastos.push(descripcionGasto);

    actualizarListaGastos();
    limpiar();
}

function actualizarListaGastos() {
    const listaElemento = document.getElementById('listaDeGastos');
    const totalElementos = document.getElementById('totalGastos');
    let htmlLista = '';
    let totalGastos = 0;
    listaNombresGastos.forEach((Elemento, posicion) => {
        const valorGasto = parseFloat(listaValoresGasto[posicion]);
        const descripcionGasto = listaDescripcionesGastos[posicion];

        htmlLista += `<li>${Elemento} - $${valorGasto.toFixed(2)} - ${descripcionGasto}
            <button onclick="eliminarGasto(${posicion});">Eliminar</button>
            <button onclick="editarGasto(${posicion});">Modificar</button>
            </li>`;
        // Calculamos el total de gastos 
        totalGastos += valorGasto;
    });

    listaElemento.innerHTML = htmlLista;
    totalElementos.innerHTML = `$${totalGastos.toFixed(2)}`;
}

function limpiar() {
    document.getElementById('nombreGasto').value = '';
    document.getElementById('valorGasto').value = ''; 
    document.getElementById('descripcionGasto').value = '';
    gastoEnEdicion = null; // Reinicia la variable de edición
    document.getElementById('botonFormulario').textContent = 'Agregar Gasto';
}

function eliminarGasto(posicion) {
    listaNombresGastos.splice(posicion, 1);
    listaValoresGasto.splice(posicion, 1);
    listaDescripcionesGastos.splice(posicion, 1);
    actualizarListaGastos();
}

function editarGasto(posicion) {
    // Llena los inputs con los valores del gasto seleccionado
    document.getElementById('nombreGasto').value = listaNombresGastos[posicion];
    document.getElementById('valorGasto').value = listaValoresGasto[posicion];
    document.getElementById('descripcionGasto').value = listaDescripcionesGastos[posicion];
    gastoEnEdicion = posicion;
    document.getElementById('botonFormulario').textContent = 'Actualizar Gasto';
}

function actualizarGasto(nombreGasto, valorGasto, descripcionGasto) {
    if (gastoEnEdicion === null) return;

    listaNombresGastos[gastoEnEdicion] = nombreGasto;
    listaValoresGasto[gastoEnEdicion] = valorGasto;
    listaDescripcionesGastos[gastoEnEdicion] = descripcionGasto;

    actualizarListaGastos();
    limpiar();
}
