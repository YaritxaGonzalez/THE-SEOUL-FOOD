function inyectarFooter(){
    document.getElementById("footer").innerHTML = `
        <p>© 2026 The Seoul Food — Todos los derechos reservados</p>
        <p>Envíos a todo Chile 🇨🇱 · contacto@theseoulfood.cl</p>
    `;
}

function inyectarHeader(){
    document.getElementById("header").innerHTML = "<section><h1 class='no-select'>The Seoul Food</h1></section><section><a href='#inicio'>inicio</a>";
}

inyectarHeader();
inyectarFooter();