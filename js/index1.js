function iniciar() {
    const filePath = '/reto5/datos/index.json';
    async function obtenerDatos() {
        const response = await fetch(filePath);
        const data = await response.json();
        const dataArray = Object.values(data);
        return dataArray;
    }

    obtenerDatos().then(data => {
       let cantidadElementos = data.length;
        let contadorPrincipal=0;
        while (cantidadElementos > 0) {
            let contPrinpal = document.getElementById("contenedor-principal");
            let elementoFila = document.createElement("div");
            elementoFila.classList.add("fila");
            contPrinpal.appendChild(elementoFila);
            let contador=0;
            while (cantidadElementos>0 && contador<4) {
                elementoCelda = document.createElement("div");
                elementoCelda.classList.add("contenedor")
                elementoImg = document.createElement("img")
                elementoImg.src = "reto5/"+data[contadorPrincipal].imagen;
                elementoImg.alt="Imagen ";
                elementoPar=document.createElement("p");
                elementoPar.textContent=data[contadorPrincipal].nombre;
                elementoCelda.appendChild(elementoImg);
                elementoCelda.appendChild(elementoPar);
                elementoFila.appendChild(elementoCelda);

                contadorPrincipal++;
                contador++
                cantidadElementos--;
            }
        }
    })
        .catch(error => {
            console.error("Error obteniendo datos:", error);
        });

}

window.addEventListener("DOMContentLoaded", iniciar);
