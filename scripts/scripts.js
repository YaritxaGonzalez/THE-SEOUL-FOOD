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
    `;
}
// ==========================================
// AGREGADO: menú de usuario (Iniciar sesión / Registrarse)
// No modifica inyectarHeader() ni inyectarFooter()
// ==========================================
function inyectarMenuUsuario(){
    var header = document.getElementById("header");

    header.insertAdjacentHTML("beforeend", `
        <div class="user-menu">
            <button id="menu">
                <box-icon type='solid' name='user' color="#fff"></box-icon>
            </button>
            <div id="userMenuDropdown" class="hidden">
                <button id="iniciarSesion">Iniciar sesión</button>
                <button id="registrase">Registrarse</button>
            </div>
        </div>
    `);

    activarMenuUsuario();
}

function activarMenuUsuario(){
    var menu = document.getElementById("menu");
    var userMenuDropdown = document.getElementById("userMenuDropdown");
    var iniciarSesion = document.getElementById("iniciarSesion");
    var registrase = document.getElementById("registrase");

    menu.onclick = function () {
        if (userMenuDropdown.classList.contains("hidden")) {
            userMenuDropdown.classList.remove("hidden");
        } else {
            userMenuDropdown.classList.add("hidden");
        }
    };

    iniciarSesion.onclick = function () {
        window.location.href = "paginas/inicio_sesion.html";
    };

    registrase.onclick = function () {
        window.location.href = "paginas/registrarse.html";
    };
}

function activarFormularioRegistro(){
    var form = document.getElementById("formRegistro");
    if (!form) return;

    form.addEventListener("submit", function(e){
        e.preventDefault();

        var nombre = document.getElementById("nombre");
        var errorNombre = document.getElementById("errorNombre");
        var soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]{2,}$/;

        if (!soloLetras.test(nombre.value.trim())){
            errorNombre.classList.remove("hidden");
            nombre.focus();
        } else {
            errorNombre.classList.add("hidden");
        }
    });
}
function activarBotonVolver(){
    var btnVolver = document.querySelector(".btn-volver");
    if (!btnVolver) return;

    btnVolver.addEventListener("click", function(){
        window.location.href = base + "index.html";
    });
}
inyectarHeader();
inyectarFooter();

inyectarMenuUsuario();
activarFormularioRegistro();
activarBotonVolver();