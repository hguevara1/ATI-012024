function iniciar(idPerfil) {
    const filePath = "/reto5/"+ idPerfil +"/perfil.json";
    async function obtenerDatos() {
        const response = await fetch(filePath);
        const data = await response.json();
        const dataArray = Object.values(data);
        return dataArray;
    }
    
    obtenerDatos().then(data => {
        document.getElementById("foto-perfil")
            .src = "/reto5/"+ idPerfil+ "/" + data[11];
        document.getElementById("informacion-perfil")
            .firstChild.textContent = data[0];
        document.getElementById("descripcion-persona")
            .innerHTML = data[1];
        let lF = document.getElementsByClassName("datos-favoritos")
            .item(0);
        for (let i = 0; i < 5; i++) {
            let textoLi = lF.children[i].textContent;
            lF.children[i].innerHTML = textoLi + data[i + 2];
        }
        caja=document.getElementById("caja").children[3].children[0]
        .innerHTML=data[7];
    })
        .catch(error => {
            console.error("Error obteniendo datos:", error);
        });
    
}

const urlParams = new URLSearchParams(window.location.search);
const idPerfil = urlParams.get('id'); // Obtener el parámetro "id" de la URL

window.addEventListener("DOMContentLoaded", iniciar(idPerfil));


