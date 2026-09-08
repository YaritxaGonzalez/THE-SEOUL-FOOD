const CARACTERES_COREANOS = [
    // Array con sílabas básicas del Hangul
    "가","나","다","라","마","바","사","아","자","차","카","타","파","하",
    "거","너","더","러","머","버","서","어","저","처","커","터","퍼","허",
    "고","노","도","로","모","보","소","오","조","초","코","토","포","호",
    "구","누","두","루","무","부","수","우","주","추","쿠","투","푸","후"
];

function generarMatrix(){
    // Busca el contenedor con clase .jp-matrix
    let contenedor = document.querySelector(".jp-matrix");
    if (!contenedor){
        // Si no existe, lo crea y lo inserta al inicio del body
        contenedor = document.createElement("div");
        contenedor.className = "jp-matrix";
        document.body.insertBefore(contenedor, document.body.firstChild);
    }

    // Calcula cuántas columnas y filas caben en pantalla
    // Cada celda mide 40px, se suma un margen de +2 para cubrir variaciones
    const columnas = Math.ceil(window.innerWidth / 40) + 2;
    const filas = Math.ceil(window.innerHeight / 40) + 2;
    const total = columnas * filas;

    // Genera el HTML con caracteres aleatorios del array
    let html = "";
    for (let i = 0; i < total; i++){
        const caracter = CARACTERES_COREANOS[Math.floor(Math.random() * CARACTERES_COREANOS.length)];
        html += `<span>${caracter}</span>`;
    }
    contenedor.innerHTML = html; // Inserta los spans en el contenedor
}

// Llama la función al cargar
generarMatrix();

// Vuelve a generar la matriz cuando se cambia el tamaño de la ventana
window.addEventListener("resize", generarMatrix);
