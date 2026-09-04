
//CARRITO DE COMPRAS 

const CARRITO_STORAGE_KEY = "seoulfood_carrito";

function obtenerCarrito(){
    var data = localStorage.getItem(CARRITO_STORAGE_KEY);
    return data ? JSON.parse(data) : {};
}

function guardarCarrito(carrito){
    localStorage.setItem(CARRITO_STORAGE_KEY, JSON.stringify(carrito));
}

function obtenerCantidadProducto(id){
    var carrito = obtenerCarrito();
    return carrito[id] || 0;
}

function setCantidadProducto(id, cantidad){
    var carrito = obtenerCarrito();

    if (cantidad <= 0){
        delete carrito[id];
    } else {
        carrito[id] = cantidad;
    }

    guardarCarrito(carrito);
    actualizarBadgeCarrito();
    pintarCarritoPanel();
}

function obtenerCantidadTotalCarrito(){
    var carrito = obtenerCarrito();
    return Object.keys(carrito).reduce(function(total, id){
        return total + carrito[id];
    }, 0);
}

function calcularTotalCarrito(){
    var carrito = obtenerCarrito();
    return Object.keys(carrito).reduce(function(total, id){
        var producto = PRODUCTOS.find(function(p){ return p.id === id; });
        if (!producto) return total;
        return total + (producto.precio * carrito[id]);
    }, 0);
}

function actualizarBadgeCarrito(){
    var badge = document.getElementById("carritoContador");
    if (badge) badge.textContent = obtenerCantidadTotalCarrito();
}

// Ajusta la ruta de imagen según si la página está en /paginas o en la raíz 
function rutaImagenCarrito(imagen){
    var enSubcarpeta = window.location.pathname.includes("/paginas/");
    return enSubcarpeta ? "../" + imagen : imagen;
}

// Convierte un botón "agregar" en el control +/- 
function mostrarControlCantidad(elementoBoton, id, cantidad){
    var html =
        '<div class="qty-control producto-control" data-id="' + id + '">' +
            '<button type="button" class="qty-btn qty-menos" aria-label="Quitar uno">-</button>' +
            '<span class="qty-valor">' + cantidad + '</span>' +
            '<button type="button" class="qty-btn qty-mas" aria-label="Agregar uno">+</button>' +
        '</div>';
    elementoBoton.outerHTML = html;
}

// Devuelve el control +/- a su estado original de botón "agregar" 
function mostrarBotonAgregar(elementoControl, id){
    elementoControl.outerHTML =
        '<button type="button" class="button producto-control" data-id="' + id + '">Agregar</button>';
}

// Sincroniza cualquier botón/control de producto en la página con el carrito guardado
function sincronizarControlProducto(id){
    var cantidad = obtenerCantidadProducto(id);

    document.querySelectorAll('.producto-control[data-id="' + id + '"]').forEach(function(el){
        if (el.classList.contains("qty-control")){
            if (cantidad <= 0){
                mostrarBotonAgregar(el, id);
            } else {
                el.querySelector(".qty-valor").textContent = cantidad;
            }
        } else if (el.tagName === "BUTTON" && cantidad > 0){
            mostrarControlCantidad(el, id, cantidad);
        }
    });
}

// Al cargar la página, deja cada botón "agregar" como corresponda según el carrito guardado
function sincronizarBotonesCarrito(){
    document.querySelectorAll(".button.producto-control[data-id]").forEach(function(boton){
        var id = boton.dataset.id;
        var cantidad = obtenerCantidadProducto(id);
        if (cantidad > 0){
            mostrarControlCantidad(boton, id, cantidad);
        }
    });
}

// El contenido del panel del carrito (lista de productos + total)
function pintarCarritoPanel(){
    var lista = document.getElementById("carritoItems");
    var totalEl = document.getElementById("carritoTotal");
    if (!lista || !totalEl) return;

    var carrito = obtenerCarrito();
    var ids = Object.keys(carrito);

    if (ids.length === 0){
        lista.innerHTML = "<p class='carrito-vacio'>Tu carrito está vacío.</p>";
        totalEl.textContent = "$0";
        return;
    }

    var html = "";
    ids.forEach(function(id){
        var producto = PRODUCTOS.find(function(p){ return p.id === id; });
        if (!producto) return;
        var cantidad = carrito[id];

        html +=
            '<div class="carrito-item">' +
                '<img src="' + rutaImagenCarrito(producto.imagen) + '" alt="' + producto.nombre + '">' +
                '<div class="carrito-item-info">' +
                    '<span class="carrito-item-nombre">' + producto.nombre + '</span>' +
                    '<span class="carrito-item-precio">$' + producto.precio.toLocaleString("es-CL") + '</span>' +
                '</div>' +
                '<div class="qty-control carrito-control" data-id="' + id + '">' +
                    '<button type="button" class="qty-btn qty-menos" aria-label="Quitar uno">-</button>' +
                    '<span class="qty-valor">' + cantidad + '</span>' +
                    '<button type="button" class="qty-btn qty-mas" aria-label="Agregar uno">+</button>' +
                '</div>' +
            '</div>';
    });

    lista.innerHTML = html;
    totalEl.textContent = "$" + calcularTotalCarrito().toLocaleString("es-CL");
}

function alternarPanelCarrito(){
    var panel = document.getElementById("carritoPanel");
    if (panel) panel.classList.toggle("abierto");
}

function inicializarCarrito(){
    actualizarBadgeCarrito();
    sincronizarBotonesCarrito();
    pintarCarritoPanel();

    document.addEventListener("click", function(e){

        // Primer clic en "agregar": lo convierte en el control +/-
        var btnAgregar = e.target.closest(".button.producto-control[data-id]");
        if (btnAgregar){
            var idAgregar = btnAgregar.dataset.id;
            var nuevaCantidad = obtenerCantidadProducto(idAgregar) + 1;
            setCantidadProducto(idAgregar, nuevaCantidad);
            mostrarControlCantidad(btnAgregar, idAgregar, nuevaCantidad);
            return;
        }

        // Clic en "+" o "-" 
        var btnMas = e.target.closest(".qty-mas");
        var btnMenos = e.target.closest(".qty-menos");
        if (btnMas || btnMenos){
            var control = (btnMas || btnMenos).closest(".qty-control");
            var id = control.dataset.id;
            var cantidadActual = obtenerCantidadProducto(id);
            var cantidadNueva = btnMas ? cantidadActual + 1 : cantidadActual - 1;

            setCantidadProducto(id, cantidadNueva);
            sincronizarControlProducto(id);
            return;
        }

        // Abrir / cerrar el panel del carrito
        if (e.target.closest("#carritoIcono") || e.target.closest("#carritoCerrar")){
            alternarPanelCarrito();
            return;
        }
    });
}

inicializarCarrito();
