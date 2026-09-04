const PRODUCTOS = [
    { id: "chapagetti",    nombre: "Nongshim Chapagetti",     imagen: "imagenes/Nongshim-Chapagetti-Exp.webp",              precio: 3990, descripcion: "Fideos estilo jjajangmyeon con salsa de pasta de soja negra." },
    { id: "sarigomtang",   nombre: "Nongshim Sarigomtang",    imagen: "imagenes/Nongshim-Sarigomtang-Ramyeon.webp",         precio: 3990, descripcion: "Ramyeon con sabor a caldo de huesos, suave y reconfortante." },
    { id: "jin-veggie",    nombre: "Ottogi Jin Veggie",       imagen: "imagenes/Otoki-Jin-Veggie.webp",                     precio: 3790, descripcion: "Versión vegetariana del clásico Jin Ramyeon." },
    { id: "shin-ramyeon",  nombre: "Nongshim Shin Ramyeon",   imagen: "imagenes/Nongshim-Shin-Ramyeon-Ramyeon-1.webp",      precio: 3990, descripcion: "El ramyeon picante más icónico de Corea." },
    { id: "yukgaejang",    nombre: "Nongshim Yukgaejang",     imagen: "imagenes/Nongshim-Yukgaejang-Ramyeon.webp",          precio: 3990, descripcion: "Sabor a sopa picante de res deshebrada." },
    { id: "ottogi-fideos", nombre: "Ottogi Ramyeon",          imagen: "imagenes/Ottogi-Fideos-de-Ramyeon.webp",             precio: 3790, descripcion: "Fideos clásicos estilo Ottogi." }
];

function mostrarProducto(){
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const producto = PRODUCTOS.find(function(p){ return p.id === id; });

    if (!producto){
        document.getElementById("detalleProducto").innerHTML = "<p>Producto no encontrado.</p>";
        return;
    }

    document.getElementById("productoImagen").src = "../" + producto.imagen;
    document.getElementById("productoImagen").alt = producto.nombre;
    document.getElementById("productoNombre").textContent = producto.nombre;
    document.getElementById("productoDescripcion").textContent = producto.descripcion;
    document.getElementById("productoPrecio").textContent = "Precio: $" + producto.precio.toLocaleString("es-CL");

    // Para saber qué producto se está agregando
    var btnAgregar = document.getElementById("btnAgregarDetalle");
    if (btnAgregar) btnAgregar.dataset.id = producto.id;
}

mostrarProducto();