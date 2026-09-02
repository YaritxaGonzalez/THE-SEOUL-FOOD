function inyectarFooter(){
    document.getElementById("footer").innerHTML = `
        <p>© 2026 The Seoul Food — Todos los derechos reservados</p>
        <p>Envíos a todo Chile 🇨🇱 · contacto@theseoulfood.cl</p>
    `;
}

function inyectarHeader(){
    document.getElementById("header").innerHTML = `
        <section><h1 class='no-select'>The Seoul Food</h1></section>
        <section><a href='#inicio'>inicio</a></section>
        <div class="user-menu">
            <button id="menu">
                <box-icon type='solid' name='user' color="#fff"></box-icon>
            </button>
            <div id="userMenuDropdown" class="hidden">
                <button id="inicio">Iniciar sesión</button>
                <button id="registrase">Registrarse</button>
            </div>
        </div>
    `;

    activarMenuUsuario();
}

function activarMenuUsuario(){
    var menu = document.getElementById("menu");
    var userMenuDropdown = document.getElementById("userMenuDropdown");
    var inicio = document.getElementById("inicio");
    var registrase = document.getElementById("registrase");

    menu.onclick = function () {
        if (userMenuDropdown.classList.contains("hidden")) {
            userMenuDropdown.classList.remove("hidden");
        } else {
            userMenuDropdown.classList.add("hidden");
        }
    };

    inicio.onclick = function () {
        window.location.href = "paginas/inicio_sesion.html";
    };

    registrase.onclick = function () {
        window.location.href = "paginas/registrarse.html";
    };
}

inyectarHeader();
inyectarFooter();