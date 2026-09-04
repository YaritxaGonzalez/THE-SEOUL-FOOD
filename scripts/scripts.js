function inyectarFooter(){
    document.getElementById("footer").innerHTML = `
        <div class="footer-brand">
            <img src="imagenes/store-front.png" alt="Logo The Seoul Food">
            <span>The Seoul Food</span>
        </div>
        <p>📧 contacto@theseoulfood.cl · 📍 Envíos a todo Chile</p>
        <p>© 2026 The Seoul Food — Todos los derechos reservados</p>
    `;
}
 
function inyectarHeader(){
    document.getElementById("header").innerHTML = `
        <section class="header-brand">
            <img src="imagenes/store-front.png" alt="Logo The Seoul Food">
            <h1 class="no-select">The Seoul Food</h1>
        </section>
        <section>
            <a href="#inicio">Inicio</a>
            <a href="#productos">Productos</a>
            <a href="#footer">Contacto</a>
        </section>

    
        <button type="button" id="carritoIcono" class="carrito-icono" aria-label="Ver carrito">
            <i class='bx bx-cart'></i>
            <span id="carritoContador" class="carrito-badge">0</span>
        </button>

        <aside id="carritoPanel" class="carrito-panel">
            <div class="carrito-panel-header">
                <h2>Mi carrito</h2>
                <button type="button" id="carritoCerrar" class="carrito-cerrar" aria-label="Cerrar carrito">✕</button>
            </div>
            <div id="carritoItems" class="carrito-items"></div>
            <div class="carrito-panel-footer">
                <span>Total:</span>
                <span id="carritoTotal">$0</span>
            </div>
        </aside>
    `;
}
inyectarHeader();
inyectarFooter();

