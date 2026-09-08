// ==========================================
// admin.js — Panel de administración
// Protege administrador.html y maneja el CRUD
// de productos (agregar, editar precio/stock, eliminar)
// ==========================================

function protegerPaginaAdmin(){
    var rol = localStorage.getItem("rolActual");
    if (rol !== "admin"){
        alert("No tienes permiso para ver esta página");
        window.location.href = "../index.html";
    }
}

// ---------- Lectura/escritura de lo guardado por el admin ----------
// (PRODUCTOS ya viene fusionado con estos datos gracias a productos.js)

function obtenerAgregados(){
    return JSON.parse(localStorage.getItem("productosAgregados")) || [];
}
function guardarAgregados(lista){
    localStorage.setItem("productosAgregados", JSON.stringify(lista));
}
function obtenerEditados(){
    return JSON.parse(localStorage.getItem("productosEditados")) || {};
}
function guardarEditados(obj){
    localStorage.setItem("productosEditados", JSON.stringify(obj));
}
function obtenerEliminados(){
    return JSON.parse(localStorage.getItem("productosEliminados")) || [];
}
function guardarEliminados(lista){
    localStorage.setItem("productosEliminados", JSON.stringify(lista));
}

// ---------- Acciones CRUD ----------

// Crea un producto nuevo y lo agrega al catálogo en memoria + localStorage
function agregarProductoAdmin(datos){
    var nuevo = {
        id: "ADM-" + Date.now(),   // id único para productos creados desde el panel
        nombre: datos.nombre,
        imagen: datos.imagen,
        precio: Number(datos.precio),
        descripcion: datos.descripcion,
        stock: Number(datos.stock)
    };

    var agregados = obtenerAgregados();
    agregados.push(nuevo);
    guardarAgregados(agregados);

    PRODUCTOS.push(nuevo); // refleja el cambio de inmediato en esta misma vista
}

// Actualiza precio y stock de cualquier producto (base o creado por el admin)
function editarProductoAdmin(id, precio, stock){
    var producto = PRODUCTOS.find(function(p){ return p.id === id; });
    if (!producto) return;

    producto.precio = Number(precio);
    producto.stock = Number(stock);

    if (String(id).indexOf("ADM-") === 0){
        // Producto creado por el admin: se actualiza dentro de "productosAgregados"
        var agregados = obtenerAgregados().map(function(p){
            return p.id === id ? producto : p;
        });
        guardarAgregados(agregados);
    } else {
        // Producto del catálogo base: la edición se guarda aparte
        var editados = obtenerEditados();
        editados[id] = { precio: producto.precio, stock: producto.stock };
        guardarEditados(editados);
    }
}

// Elimina un producto del catálogo (base o creado por el admin)
function eliminarProductoAdmin(id){
    var index = PRODUCTOS.findIndex(function(p){ return p.id === id; });
    if (index !== -1) PRODUCTOS.splice(index, 1);

    if (String(id).indexOf("ADM-") === 0){
        guardarAgregados(obtenerAgregados().filter(function(p){ return p.id !== id; }));
    } else {
        var eliminados = obtenerEliminados();
        eliminados.push(id);
        guardarEliminados(eliminados);
    }
}

// ---------- Interfaz del panel (tabla + formulario) ----------

function renderizarPanelAdmin(){
    var contenedor = document.getElementById("listaProductosAdmin");
    if (!contenedor) return;

    contenedor.innerHTML = "";

    PRODUCTOS.forEach(function(p){
        var fila = document.createElement("tr");
        fila.innerHTML = `
            <td><img src="../${p.imagen}" alt="${p.nombre}" class="admin-thumb"></td>
            <td>${p.nombre}</td>
            <td><input type="number" class="input-precio" data-id="${p.id}" value="${p.precio}" min="0"></td>
            <td><input type="number" class="input-stock" data-id="${p.id}" value="${p.stock}" min="0"></td>
            <td class="admin-acciones">
                <button type="button" class="button btn-guardar" data-id="${p.id}">Guardar</button>
                <button type="button" class="button btn-eliminar" data-id="${p.id}">Eliminar</button>
            </td>
        `;
        contenedor.appendChild(fila);
    });
}

function activarFormularioNuevoProducto(){
    var form = document.getElementById("formNuevoProducto");
    if (!form) return;

    form.addEventListener("submit", function(e){
        e.preventDefault();

        agregarProductoAdmin({
            nombre: document.getElementById("nuevoNombre").value.trim(),
            imagen: document.getElementById("nuevoImagen").value.trim(),
            precio: document.getElementById("nuevoPrecio").value,
            descripcion: document.getElementById("nuevoDescripcion").value.trim(),
            stock: document.getElementById("nuevoStock").value
        });

        form.reset();
        renderizarPanelAdmin();
    });
}

// Delegación de eventos: un solo listener para todos los botones de la tabla
function activarAccionesTablaAdmin(){
    var contenedor = document.getElementById("listaProductosAdmin");
    if (!contenedor) return;

    contenedor.addEventListener("click", function(e){
        var boton = e.target.closest("button[data-id]");
        if (!boton) return;
        var id = boton.dataset.id;

        if (boton.classList.contains("btn-guardar")){
            var fila = boton.closest("tr");
            var precio = fila.querySelector(".input-precio").value;
            var stock = fila.querySelector(".input-stock").value;
            editarProductoAdmin(id, precio, stock);
            alert("Producto actualizado");
        }

        if (boton.classList.contains("btn-eliminar")){
            if (confirm("¿Eliminar este producto?")){
                eliminarProductoAdmin(id);
                renderizarPanelAdmin();
            }
        }
    });
}

// ==========================================
// Header propio del panel de administración
// (NO usa inyectarHeader() de scripts.js — es independiente,
// así el header del resto del sitio no se toca para nada)
// ==========================================
function inyectarHeaderAdmin(){
    if (window.location.pathname.indexOf("administrador.html") === -1) return;

    var header = document.getElementById("header");
    if (!header) return;

    header.innerHTML = `
        <section class="header-brand">
            <img src="../imagenes/store-front.png" alt="Logo The Seoul Food">
            <h1 class="no-select">The Seoul Food · Admin</h1>
        </section>
        <section>
            <a href="../index.html">Inicio</a>
            <a href="#" class="admin-nav-link" data-tab="tabStock">Stock</a>
            <a href="#" class="admin-nav-link" data-tab="tabProducto">Producto</a>
        </section>
        <div class="header-controls"></div>
    `;
}
// Cambia entre las pestañas "Stock" y "Producto"
function activarMenuAdmin(){
    var botones = document.querySelectorAll(".admin-nav-link");
    if (!botones.length) return;

    botones.forEach(function(boton){
        boton.addEventListener("click", function(e){
            e.preventDefault(); // evita que el <a href="#"> haga scroll/salte

            // Quita "active" de todos los botones y lo pone en el que se clickeó
            botones.forEach(function(b){ b.classList.remove("active"); });
            boton.classList.add("active");

            // Oculta todas las pestañas y muestra solo la que corresponde
            document.querySelectorAll(".admin-tab").forEach(function(tab){
                tab.classList.add("oculto");
            });
            document.getElementById(boton.dataset.tab).classList.remove("oculto");
        });
    });
}

document.addEventListener("DOMContentLoaded", function(){
    protegerPaginaAdmin();
    inyectarHeaderAdmin();
    renderizarPanelAdmin();
    activarFormularioNuevoProducto();
    activarAccionesTablaAdmin();
    activarMenuAdmin();
});