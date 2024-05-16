function iniciar(idPerfil, idioma) {
    if (idPerfil === null) {
        idPerfil = "10347014";
    }
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
    const filePath = "/reto5/" + idPerfil + "/perfil.json";
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
        document.getElementById("foto-perfil")
            .src = "/reto5/" + idPerfil + "/" + data[11];
        document.getElementById("informacion-perfil")
            .firstChild.textContent = data[0];
        document.getElementById("descripcion-persona")
            .innerHTML = data[1];
        let lF = document.getElementsByClassName("datos-favoritos")
            .item(0);
        for (let i = 0; i < 5; i++) {
            lF.children[i].innerHTML = dato[i + 6] + data[i + 2];
        }
        const regex = "[email]";
        const enlace = '<a href=https://www.example.com>' + data[7] + "</a>";
        const textoNuevo = dato[11].replace(regex, enlace);
        document.getElementById("caja").children[3].innerHTML = textoNuevo;
    })
        .catch(error => {
            console.error("Error obteniendo datos:", error);
        });

}

const urlParams = new URLSearchParams(window.location.search);
const idPerfil = urlParams.get('id'); // Obtener el parámetro "id" de la URL
const idioma = urlParams.get('idioma');

window.addEventListener("DOMContentLoaded", iniciar(idPerfil, idioma));


