function inyectarFooter(){
    document.getElementById("footer").innerHTML = `
        <div class="footer-brand">
            <img src="/imagenes/store-front.png" alt="Logo The Seoul Food">
            <span>The Seoul Food</span>
        </div>
        <p>📧 contacto@theseoulfood.cl · 📍 Envíos a todo Chile</p>
        <p>© 2026 The Seoul Food — Todos los derechos reservados</p>
    `;
}
 
function inyectarHeader(){
    document.getElementById("header").innerHTML = `
        <section class="header-brand">
            <img src="/imagenes/store-front.png" alt="Logo The Seoul Food">
            <h1 class="no-select">The Seoul Food</h1>
        </section>
        <section>
            <a href="#inicio">Inicio</a>
            <a href="#productos">Productos</a>
            <a href="#footer">Contacto</a>
        </section>
    `;
}
 
inyectarHeader();
inyectarFooter();
