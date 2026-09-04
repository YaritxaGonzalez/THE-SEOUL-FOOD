const CARACTERES_COREANOS = [
    "가","나","다","라","마","바","사","아","자","차","카","타","파","하",
    "거","너","더","러","머","버","서","어","저","처","커","터","퍼","허",
    "고","노","도","로","모","보","소","오","조","초","코","토","포","호",
    "구","누","두","루","무","부","수","우","주","추","쿠","투","푸","후"
];

function generarMatrix(){
    let contenedor = document.querySelector(".jp-matrix");
    if (!contenedor){
        contenedor = document.createElement("div");
        contenedor.className = "jp-matrix";
        document.body.insertBefore(contenedor, document.body.firstChild);
    }

    // +2 columnas y +2 filas de margen, para cubrir aunque el navegador
    // calcule un número de columnas distinto al que estimamos aquí.
    const columnas = Math.ceil(window.innerWidth / 40) + 2;
    const filas = Math.ceil(window.innerHeight / 40) + 2;
    const total = columnas * filas;

    let html = "";
    for (let i = 0; i < total; i++){
        const caracter = CARACTERES_COREANOS[Math.floor(Math.random() * CARACTERES_COREANOS.length)];
        html += `<span>${caracter}</span>`;
    }
    contenedor.innerHTML = html;
}

generarMatrix();
window.addEventListener("resize", generarMatrix);