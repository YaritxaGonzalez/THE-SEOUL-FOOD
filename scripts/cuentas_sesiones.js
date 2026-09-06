// ==========================================
// Inyección de header y footer
// (matriz.js no se toca, esto vive aparte en este archivo)
// ==========================================
function inyectarFooter(){
    document.getElementById("footer").innerHTML = `
        <div class="footer-brand">
            <img src="../imagenes/store-front.png" alt="Logo The Seoul Food">
            <span>The Seoul Food</span>
        </div>
        <p>📧 contacto@theseoulfood.cl · 📍 Envíos a todo Chile</p>
        <p>© 2026 The Seoul Food — Todos los derechos reservados</p>
    `;
}

function inyectarHeader(){
    document.getElementById("header").innerHTML = `
        <section class="header-brand">
            <img src="../imagenes/store-front.png" alt="Logo The Seoul Food">
            <h1 class="no-select">The Seoul Food</h1>
        </section>
        <section>
            <a href="../index.html#inicio">Inicio</a>
            <a href="../index.html#productos">Productos</a>
            <a href="../index.html#footer">Contacto</a>
        </section>
    `;
}

// ==========================================
// Menú de usuario (Iniciar sesión / Registrarse)
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
        window.location.href = "/paginas/inicio_sesion.html";
    };

    registrase.onclick = function () {
        window.location.href = "/paginas/registrarse.html";
    };
}

// ==========================================
// Credenciales de usuarios (admin fijo + registrados)
// ==========================================
function obtenerUsuarios(){
    var base = [
        { user: "admin@theseoulfood.cl", pass: "SoulFood2026Adm!", rol: "admin" }
    ];
    var registrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    return base.concat(registrados);
}

// ==========================================
// Login con redirección según rol
// ==========================================
function activarFormularioLogin(){
    var form = document.getElementById("formLogin");
    if (!form) return;

    form.addEventListener("submit", function(e){
        e.preventDefault();

        var correo = document.getElementById("correo").value.trim().toLowerCase();
        var pass = document.getElementById("pass").value;

        if (correo === "" || pass === ""){
            alert("Completa todos los campos");
            return;
        }

        var encontrado = obtenerUsuarios().find(u => u.user === correo && u.pass === pass);

        if (encontrado){
            localStorage.setItem("rolActual", encontrado.rol);
            localStorage.setItem("userActual", encontrado.user);

            if (encontrado.rol === "admin"){
                window.location.href = "administrador.html";
            } else {
                window.location.href = "../index.html";
            }
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
}

// ==========================================
// Registro con validaciones reforzadas
// ==========================================
function activarFormularioRegistro(){
    var form = document.getElementById("formRegistro");
    if (!form) return;

    form.addEventListener("submit", function(e){
        e.preventDefault();

        var nombre = document.getElementById("nombre");
        var correo = document.getElementById("correo");
        var telefono = document.getElementById("telefono");
        var pass = document.getElementById("pass");
        var confirmarPass = document.getElementById("confirmarPass");
        var errorNombre = document.getElementById("errorNombre");

        var nombreVal = nombre.value.trim();
        var correoVal = correo.value.trim().toLowerCase();
        var telefonoVal = telefono.value.trim();
        var passVal = pass.value;
        var confirmarPassVal = confirmarPass.value;

        // --- Nombre: solo letras y espacios simples entre palabras ---
        var soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúÑñ]+(\s[A-Za-zÁÉÍÓÚáéíóúÑñ]+)*$/;
        if (!soloLetras.test(nombreVal)){
            errorNombre.classList.remove("hidden");
            nombre.focus();
            return;
        } else {
            errorNombre.classList.add("hidden");
        }

        // --- Correo: formato estricto ---
        var correoRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (!correoRegex.test(correoVal)){
            alert("Ingresa un correo electrónico válido");
            correo.focus();
            return;
        }

        // --- Bloquea inyección de HTML/script en campos de texto ---
        var patronPeligroso = /<|>|script|onerror|onload/i;
        if (patronPeligroso.test(nombreVal) || patronPeligroso.test(correoVal)){
            alert("El texto ingresado contiene caracteres no permitidos");
            return;
        }

        // --- Teléfono: solo números, 8 a 15 dígitos, + opcional ---
        var telefonoRegex = /^\+?[0-9]{8,15}$/;
        if (!telefonoRegex.test(telefonoVal)){
            alert("Ingresa un teléfono válido (solo números, con o sin +código de país)");
            telefono.focus();
            return;
        }

        // --- Contraseña: mínimo 8 caracteres, letras y números ---
        var passRegex = /^(?=.*[A-Za-z])(?=.*\d).{8,}$/;
        if (!passRegex.test(passVal)){
            alert("La contraseña debe tener al menos 8 caracteres, incluyendo letras y números");
            pass.focus();
            return;
        }

        // --- Confirmación de contraseña ---
        if (passVal !== confirmarPassVal){
            alert("Las contraseñas no coinciden");
            confirmarPass.focus();
            return;
        }

        // --- Evita correos duplicados (incluye el admin fijo) ---
        var yaExiste = obtenerUsuarios().some(u => u.user === correoVal);
        if (yaExiste){
            alert("Ya existe una cuenta registrada con ese correo");
            correo.focus();
            return;
        }

        // --- Registro válido ---
        var registrados = JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
        registrados.push({ user: correoVal, pass: passVal, rol: "cliente" });
        localStorage.setItem("usuariosRegistrados", JSON.stringify(registrados));

        document.getElementById("mensajeExito").classList.remove("hidden");
        setTimeout(function(){
            window.location.href = "../index.html";
        }, 1500);
    });
}

// ==========================================
// Proteger página de administración
// ==========================================
function protegerPaginaAdmin(){
    var rol = localStorage.getItem("rolActual");
    if (rol !== "admin"){
        alert("No tienes permiso para ver esta página");
        window.location.href = "../index.html";
    }
}

// ==========================================
// Botón volver
// ==========================================
function activarBotonVolver(){
    var btnVolver = document.querySelector(".btn-volver");
    if (!btnVolver) return;

    btnVolver.addEventListener("click", function(){
        window.location.href = "../index.html";
    });
}

// ==========================================
// Ejecutar al cargar el DOM
// ==========================================
document.addEventListener("DOMContentLoaded", function(){
    activarFormularioLogin();
    activarFormularioRegistro();
    activarBotonVolver();

    if (window.location.pathname.includes("administrador.html")){
        protegerPaginaAdmin();
    }
});

inyectarHeader();
inyectarMenuUsuario();
inyectarFooter();