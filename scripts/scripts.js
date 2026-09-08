// ============================================================
// scripts.js
// Se encarga de inyectar (crear dinámicamente) el header y el
// footer en cualquier página que lo cargue, para no tener que
// repetir el mismo HTML en cada archivo .html del sitio.
// ============================================================

// "raiz" indica cuántos niveles hay que subir para llegar a la carpeta
// raíz del proyecto (donde está index.html). Cada página HTML la define
// ANTES de cargar este script:
//   - En index.html (raíz):        <script>const RAIZ = "";</script>
//   - En paginas/producto.html:    <script>const RAIZ = "../";</script>
// Solo se usan rutas relativas, así que funciona igual en local, en
// GitHub Pages (usuario.github.io/repo/) o en cualquier subcarpeta.
//
// Si por algún motivo la página no definió RAIZ (typeof RAIZ === "undefined"),
// se usa "" por defecto para que el script no explote.
var raiz = (typeof RAIZ !== "undefined") ? RAIZ : "";

// --------------------------------------------------------------
// inyectarFooter()
// Busca el elemento con id="footer" en el HTML de la página y le
// inserta el contenido del pie de página: logo + nombre de la
// tienda, correo de contacto y aviso de derechos reservados.
// --------------------------------------------------------------
function inyectarFooter() {
    document.getElementById("footer").innerHTML = `
        <div class="footer-brand">
            <img src="${raiz}imagenes/store-front.png" alt="Logo The Seoul Food">
            <span>The Seoul Food</span>
        </div>
        <p>📧 contacto@theseoulfood.cl · 📍 Envíos a todo Chile</p>
        <p>© 2026 The Seoul Food — Todos los derechos reservados</p>
    `;
}

// --------------------------------------------------------------
// inyectarHeader()
// Busca el elemento con id="header" en el HTML de la página y le
// inserta todo el contenido de la cabecera:
//   - Marca (logo + nombre de la tienda)
//   - Menú de navegación (Inicio / Productos / Contacto)
//   - Ícono del carrito con contador de productos
//   - Panel lateral del carrito (oculto hasta que el usuario lo abre)
// --------------------------------------------------------------
function inyectarHeader() {
    document.getElementById("header").innerHTML = `
        <section class="header-brand">
            <img src="${raiz}imagenes/store-front.png" alt="Logo The Seoul Food">
            <h1 class="no-select">The Seoul Food</h1>
        </section>

        <!-- Menú de navegación. "Inicio" usa la raíz calculada arriba
             para funcionar igual desde cualquier carpeta del sitio.
             "Productos" y "Contacto" apuntan a secciones (#anclas)
             dentro de la misma página, por eso no necesitan raíz. -->
        <section>
            <a href="${raiz}index.html#inicio">Inicio</a>
            <a href="#productos">Productos</a>
            <a href="#footer">Contacto</a>
        </section>

        <!-- Ícono del carrito en la cabecera, con contador (badge) -->
        <div class="header-controls">
            <button type="button" id="carritoIcono" class="carrito-icono" aria-label="Ver carrito">
                <i class='bx bx-cart'></i>
                <span id="carritoContador" class="carrito-badge">0</span>
            </button>
        </div>

        <!-- Panel lateral del carrito de compras (se muestra/oculta con CSS/JS,
             se controla desde carrito.js) -->
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

// Se ejecutan de inmediato apenas se carga el script, para que el
// header y el footer aparezcan sin esperar ningún evento adicional.
inyectarHeader();
inyectarFooter();