function pintarProductos(){
    var contenedor = document.querySelector(".contenedor"); 
    // Busca el contenedor donde se mostrarán los productos
    if (!contenedor) return; 
    // Si no existe, termina la función

    var html = "";

    PRODUCTOS.forEach(function(producto){
        // Recorre cada producto del array PRODUCTOS
        html += `
            <article class="caluga">
                <a href="paginas/producto.html?id=${producto.id}" class="producto-link">
                    <span class="nombre">${producto.nombre}</span>
                    <img src="${producto.imagen}" alt="${producto.nombre}">
                </a>
                <span class="precio">Precio: $${producto.precio.toLocaleString("es-CL")}</span>
                <button class="button producto-control" data-id="${producto.id}" ${producto.stock === 0 ? 'disabled' : ''}>Agregar</button>
            </article>
        `;
        // Genera el HTML de cada tarjeta:
        // - Link al detalle del producto con su ID en la URL
        // - Nombre y foto
        // - Precio formateado en pesos chilenos
        // - Botón "Agregar" (deshabilitado si stock = 0)
    });

    contenedor.innerHTML = html; 
    // Inserta todo el HTML generado en el contenedor
}

pintarProductos(); 
// Llama a la función para pintar los productos al cargar la página
