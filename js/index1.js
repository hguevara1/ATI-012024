function iniciar(idioma, contPrinpal) {
    switch (idioma) {
        case "Es":
            idioma = "configES.json"
            break;
        case "En":
            idioma = "configEN.json"
            break;
        case "Pt":
            idioma = "configPT.json"
            break;
        default:
            idioma = "configES.json"
            break;
    }
    const filePath = '/reto5/datos/index.json';
    async function obtenerDatos() {
        const response = await fetch(filePath);
        const data = await response.json();
        const dataArray = Object.values(data);

        const respuesta = await fetch("/reto5/conf/" + idioma);
        const data1 = await respuesta.json();
        const datos = Object.values(data1);
        return [dataArray, datos];
    }
    obtenerDatos().then(([data, dato]) => {
        const header = document.getElementById("uno");
        header.children[0].innerHTML = dato[0][0];
        header.children[1].innerHTML = dato[0][1];
        header.children[2].innerHTML = dato[0][2];
        const h = document.getElementById("nombre-usuario");
        h.innerHTML = dato[13] + ", " + data[0].nombre;
        document.getElementById("boton").innerHTML = dato[12];
        document.getElementById("entrada").placeholder = dato[4] + "...";

        sw = true;
        if (sw) {

            cargarCuadros(data, contPrinpal, sw);
            sw = false;
        }
        const pp = document.getElementsByTagName("footer").item(0)
            .children[0].innerHTML = dato[3];
        const entrada = document.querySelector("#entrada");

        if (entrada) {
            entrada.addEventListener('input', () => { //Escucha de entrada de teclado
                const valorEntrada = entrada.value;
                const datosFiltrados = data.filter(persona => filtrarPorNombre(persona.nombre, valorEntrada));
                console.log(datosFiltrados.length);
                if (datosFiltrados.length > 0) {
                    cargarCuadros(datosFiltrados, contPrinpal, sw);
                } else {
                    cargarCuadros(datosFiltrados, contPrinpal, sw);
                    elementoPar = document.createElement("p");
                    elementoPar.id="advertencia";
                    const regex = "[query]";
                    const textoNuevo=dato[14].replace(regex, valorEntrada);
                    elementoPar.textContent = textoNuevo;
                    contPrinpal.appendChild(elementoPar);
                }

            });
        } else {
            console.error("Elemento con id 'entrada' no encontrado");
        }
    })
        .catch(error => {
            console.error("Error obteniendo datos:", error);
        });

}
const urlParams = new URLSearchParams(window.location.search);
const idioma = urlParams.get('idioma');

window.addEventListener("DOMContentLoaded", () => {
    const contenedorPrincipal = document.getElementById("contenedor-principal");
    iniciar(idioma, contenedorPrincipal);
});

function cargarCuadros(data, contPrinpal, sw) {
    let cantidadElementos = data.length;
    let contadorPrincipal = 0;
    while (!sw && contPrinpal.firstChild) {
        contPrinpal.removeChild(contPrinpal.firstChild);
    }
    while (cantidadElementos > 0) {
        let elementoFila = document.createElement("div");
        elementoFila.classList.add("fila");
        contPrinpal.appendChild(elementoFila);
        let contador = 0;
        while (cantidadElementos > 0 && contador < 4) {
            elementoCelda = document.createElement("div");
            elementoCelda.classList.add("contenedor")
            elementoImg = document.createElement("img")
            elementoImg.src = "reto5/" + data[contadorPrincipal].imagen;
            elementoImg.alt = "Imagen ";
            elementoPar = document.createElement("p");
            elementoPar.textContent = data[contadorPrincipal].nombre;
            elementoCelda.appendChild(elementoImg);
            elementoCelda.appendChild(elementoPar);
            elementoFila.appendChild(elementoCelda);

            contadorPrincipal++;
            contador++
            cantidadElementos--;
        }
    }

}

function filtrarPorNombre(nombre, valor) {
    const nombreMinusculas = nombre.toLowerCase(); // Convertir nombre a minúsculas
    const valorMinusculas = valor.toLowerCase();
    return nombreMinusculas.includes(valorMinusculas);
}