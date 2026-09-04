// ==========================================
// AGREGADO: login con redirección según rol
// ==========================================
function activarFormularioLogin(){
    var form = document.getElementById("formLogin");
    if (!form) return;

    form.addEventListener("submit", function(e){
        e.preventDefault();

        var correo = document.getElementById("correo").value.trim();
        var pass = document.getElementById("pass").value;

        var encontrado = obtenerUsuarios().find(u => u.user === correo && u.pass === pass);

        if (encontrado){
            localStorage.setItem("rolActual", encontrado.rol);
            localStorage.setItem("userActual", encontrado.user);

            if (encontrado.rol === "admin"){
                window.location.href = "administracion.html"; // ajusta ruta real
            } else {
                window.location.href = "../index.html";
            }
        } else {
            alert("Usuario o contraseña incorrectos");
        }
    });
}

// ==========================================
// AGREGADO: proteger página de administración
// ==========================================
function protegerPaginaAdmin(){
    var rol = localStorage.getItem("rolActual");
    if (rol !== "admin"){
        alert("No tienes permiso para ver esta página");
        window.location.href = "../index.html";
    }
}

// ==========================================
// AGREGADO: CRUD de productos con localStorage
// ==========================================
function obtenerProductos(){
    return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarProductos(lista){
    localStorage.setItem("productos", JSON.stringify(lista));
}

function agregarProducto(nombre, precio, imagen){
    var productos = obtenerProductos();
    productos.push({ id: Date.now(), nombre, precio, imagen });
    guardarProductos(productos);
}

function eliminarProducto(id){
    var productos = obtenerProductos().filter(p => p.id !== id);
    guardarProductos(productos);
}

function renderizarProductos(){
    var contenedor = document.getElementById("listaProductos");
    if (!contenedor) return;

    var rol = localStorage.getItem("rolActual");
    contenedor.innerHTML = "";

    obtenerProductos().forEach(p => {
        var div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <img src="${p.imagen}" alt="${p.nombre}">
            <h3>${p.nombre}</h3>
            <p>$${p.precio}</p>
            ${rol === "admin" ? `<button onclick="eliminarProducto(${p.id}); renderizarProductos();">Eliminar</button>` : `<button>Agregar al carrito</button>`}
        `;
        contenedor.appendChild(div);
    });
}

// ==========================================
// AGREGADO: botón volver
// ==========================================
function activarBotonVolver(){
    var btnVolver = document.querySelector(".btn-volver");
    if (!btnVolver) return;

    btnVolver.addEventListener("click", function(){
        window.location.href = base + "index.html";
    });
}

// ==========================================
// Llamadas al cargar el script (como ya lo tenías)
// ==========================================
inyectarHeader();
inyectarMenuUsuario();
inyectarFooter();

// Estas dependen de elementos que solo existen en ciertas páginas,
// así que se ejecutan aparte cuando el DOM esté listo
document.addEventListener("DOMContentLoaded", function(){
    activarFormularioRegistro();
    activarFormularioLogin();
    activarBotonVolver();
    renderizarProductos();

    if (window.location.pathname.includes("administracion.html")){
        protegerPaginaAdmin();
    }
});