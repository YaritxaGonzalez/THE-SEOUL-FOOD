const PRODUCTOS = [
    // Array con todos los productos base de la tienda
    // Cada objeto tiene: id, nombre, imagen, precio, descripción y stock
    { id: "01", nombre: "Nongshim Chapagetti",              imagen: "imagenes/Nongshim-Chapagetti-Exp.webp",                precio: 3990, descripcion: "Fideos estilo jjajangmyeon con salsa de pasta de soja negra.",   stock: 10 },
    { id: "02", nombre: "Nongshim Sarigomtang",             imagen: "imagenes/Nongshim-Sarigomtang-Ramyeon.webp",           precio: 3990, descripcion: "Ramyeon con sabor a caldo de huesos, suave y reconfortante.",    stock: 10 },
    { id: "03", nombre: "Ottogi Jin Veggie",                imagen: "imagenes/Otoki-Jin-Veggie.webp",                       precio: 3790, descripcion: "Versión vegetariana del clásico Jin Ramyeon.",                   stock: 10 },
    { id: "04", nombre: "Ottogi Jin Veggie",                imagen: "imagenes/Otoki-Jin-Veggie.webp",                       precio: 3790, descripcion: "Versión vegetariana del clásico Jin Ramyeon.",                   stock: 10 },
    { id: "05", nombre: "Nongshim Shin Ramyeon",            imagen: "imagenes/Nongshim-Shin-Ramyeon-Ramyeon-1.webp",        precio: 3990, descripcion: "El ramyeon picante más icónico de Corea.",                       stock: 10 },
    { id: "06", nombre: "Nongshim Yukgaejang",              imagen: "imagenes/Nongshim-Yukgaejang-Ramyeon.webp",            precio: 3990, descripcion: "Sabor a sopa picante de res deshebrada.",                        stock: 10 },
    { id: "07", nombre: "Ottogi Ramyeon",                   imagen: "imagenes/Ottogi-Fideos-de-Ramyeon.webp",               precio: 3790, descripcion: "Fideos clásicos estilo Ottogi.",                                 stock: 10 },
    { id: "08", nombre: "Ottogi Jin Ramyeon Chicken",       imagen: "imagenes/Ottogi-Jin-Ramyeon-Chicken-1-1024x946.webp",  precio: 3790, descripcion: "Ramyeon con sabor a pollo, suave y aromático.",                  stock: 10 },
    { id: "09", nombre: "Ottogi Jin Ramyeon Spicy",         imagen: "imagenes/Ottogi-Jin-Ramyeon-Spicy-BTS.webp",           precio: 3790, descripcion: "Versión picante del clásico Jin Ramyeon.",                       stock: 10 },
    { id: "10", nombre: "Ottogi Kimchi Ramyeon",            imagen: "imagenes/Ottogi-Kimchi-Ramyeon.webp",                  precio: 3790, descripcion: "Ramyeon con sabor a kimchi fermentado.",                         stock: 10 },
    { id: "11", nombre: "Sachun Chapagetti",                imagen: "imagenes/Sachun-chapagetti.webp",                      precio: 3690, descripcion: "Fideos estilo jjajangmyeon, alternativa a Chapagetti.",          stock: 10 },
    { id: "12", nombre: "Samyang Buldak Bokkeum Myeon",     imagen: "imagenes/Samyang-Buldak-Bokkeum-Myeon-Ramyeon-1.webp", precio: 4290, descripcion: "El clásico ramyeon extra picante Buldak.",                       stock: 10 },
    { id: "13", nombre: "Samyang Buldak Quattro Cheese",    imagen: "imagenes/Samyang-Buldak-Quattro-Cheese.webp",          precio: 4390, descripcion: "Buldak picante con mezcla de cuatro quesos.",                    stock: 10 },
    { id: "14", nombre: "Samyang Cheese Buldak",            imagen: "imagenes/Samyang-Cheese-Buldak-Ramyeon.webp",          precio: 4290, descripcion: "Buldak picante con un toque cremoso de queso.",                  stock: 10 },
    { id: "15", nombre: "Samyang Cream Carbo Buldak",       imagen: "imagenes/Samyang-Cream-Carbo-Buldak-Ramyeon.webp",     precio: 4390, descripcion: "Versión carbonara cremosa del Buldak picante.",                  stock: 10 },
    { id: "16", nombre: "Samyang Hek Buldak Bokkeum Myeon", imagen: "imagenes/Samyang-Hek-Buldak-Bokkeum-Myeon-1.webp",     precio: 4290, descripcion: "Buldak picante edición Hek, sabor intenso.",                     stock: 10 },
    { id: "17", nombre: "Samyang Suegogui Myeon",           imagen: "imagenes/Samyang-Suegogui-Myeon.webp",                 precio: 3990, descripcion: "Ramyeon con sabor a carne de res.",                              stock: 0 },
];

function mostrarProducto(){
    if (!document.getElementById("detalleProducto")) return; 
    // Si no estamos en la página de detalle, no hace nada

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id"); 
    // Obtiene el parámetro ?id= de la URL

    const producto = PRODUCTOS.find(function(p){ return p.id === id; });
    // Busca el producto con ese ID en el catálogo

    if (!producto){
        // Si no existe, muestra mensaje de error
        document.getElementById("detalleProducto").innerHTML = "<p>Producto no encontrado.</p>";
        return;
    }

    // Rellena los elementos HTML con la información del producto
    document.getElementById("productoImagen").src = "../" + producto.imagen;
    document.getElementById("productoImagen").alt = producto.nombre;
    document.getElementById("productoNombre").textContent = producto.nombre;
    document.getElementById("productoDescripcion").textContent = producto.descripcion;
    document.getElementById("productoPrecio").textContent = "Precio: $" + producto.precio.toLocaleString("es-CL");

    // Asigna el ID al botón "Agregar" para saber qué producto añadir al carrito
    var btnAgregar = document.getElementById("btnAgregarDetalle");
    if (btnAgregar) btnAgregar.dataset.id = producto.id;
}
mostrarProducto();


mostrarProducto();
// ==========================================
// Aplica sobre el catálogo base los cambios guardados
// por el administrador (agregar, editar, eliminar).
// Se ejecuta en TODAS las páginas que cargan productos.js,
// así el catálogo se ve igual en tienda, detalle y carrito.
// ==========================================
(function aplicarCambiosAdmin(){
    var agregados  = JSON.parse(localStorage.getItem("productosAgregados"))  || [];
    var editados   = JSON.parse(localStorage.getItem("productosEditados"))   || {};
    var eliminados = JSON.parse(localStorage.getItem("productosEliminados")) || [];

    // Elimina del catálogo los productos que el admin borró
    for (var i = PRODUCTOS.length - 1; i >= 0; i--){
        if (eliminados.indexOf(PRODUCTOS[i].id) !== -1) PRODUCTOS.splice(i, 1);
    }

    // Aplica cambios de precio/stock sobre los productos existentes
    PRODUCTOS.forEach(function(p){
        if (editados[p.id]){
            p.precio = editados[p.id].precio;
            p.stock  = editados[p.id].stock;
        }
    });

    // Agrega al catálogo los productos nuevos creados por el admin
    agregados.forEach(function(p){ PRODUCTOS.push(p); });
})();
